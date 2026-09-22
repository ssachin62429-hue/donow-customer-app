import 'dart:async';
import 'package:flutter/material.dart';

/// Screen 09, 10, 11, 14: Complete Order Tracking, 4-Digit PIN, Active Meter & Receipt
class OrderTrackingScreen extends StatefulWidget {
  const OrderTrackingScreen({super.key});

  @override
  State<OrderTrackingScreen> createState() => _OrderTrackingScreenState();
}

enum OrderPhase {
  enRoute, // Partner travelling (Screen 09)
  arrived, // 50m Geofence / 4-Digit PIN (Screen 10)
  inProgress, // Active Billing Meter (Screen 11)
  completed, // Task Receipt & Direct Payment (Screen 14)
}

class _OrderTrackingScreenState extends State<OrderTrackingScreen> {
  OrderPhase _phase = OrderPhase.enRoute;
  int _elapsedSeconds = 0;
  Timer? _workTimer;
  final String _arrivalPin = '4819'; // Master Specification 4-Digit Doorstep PIN

  @override
  void dispose() {
    _workTimer?.cancel();
    super.dispose();
  }

  void _startBillingMeter() {
    setState(() {
      _phase = OrderPhase.inProgress;
      _elapsedSeconds = 0;
    });

    _workTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() => _elapsedSeconds++);
    });
  }

  void _completeTask() {
    _workTimer?.cancel();
    setState(() => _phase = OrderPhase.completed);
  }

  String _formatTimer(int totalSeconds) {
    final m = (totalSeconds ~/ 60).toString().padLeft(2, '0');
    final s = (totalSeconds % 60).toString().padLeft(2, '0');
    return '00:$m:$s';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Billable duration calculation (enforcing 30-min minimum floor)
    final actualMinutes = (_elapsedSeconds / 60).ceil();
    final billableMinutes = actualMinutes > 30 ? actualMinutes : 30;
    const baseRate = 2.50;
    const tipAmount = 30.00;
    final grossAmount = billableMinutes * baseRate;
    final totalPayable = grossAmount + tipAmount;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(
          _phase == OrderPhase.completed
              ? 'Task Receipt'
              : 'Order: ORD-84920',
        ),
        actions: [
          if (_phase != OrderPhase.completed)
            // Emergency SOS Button
            IconButton(
              icon: const Icon(Icons.emergency_rounded, color: Color(0xFFDC2626)),
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Emergency Assistance (SOS)'),
                    content: const Text(
                      'This triggers immediate 112 police emergency routing and alerts DoNow 24x7 safety desk with your live GPS location.',
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Cancel'),
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFDC2626),
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('SOS Alert dispatched to Police 112.'),
                              backgroundColor: Color(0xFFDC2626),
                            ),
                          );
                        },
                        child: const Text('Confirm SOS 112'),
                      ),
                    ],
                  ),
                );
              },
            ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // PHASE 1: EN-ROUTE TRACKING (Screen 09)
              if (_phase == OrderPhase.enRoute) ...[
                // Status Pill
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F766E).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.directions_bike_rounded,
                          color: Color(0xFF0F766E)),
                      SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'Rahul is en-route • Arriving in ~6 mins',
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF0F766E),
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Partner KYC Verified Card
                _buildPartnerCard(),
                const SizedBox(height: 24),

                // Simulated Progression Button for Testing
                ElevatedButton(
                  onPressed: () => setState(() => _phase = OrderPhase.arrived),
                  child: const Text('Simulate: Partner Reached (50m Geofence)'),
                ),
              ],

              // PHASE 2: DOORSTEP ARRIVAL & 4-DIGIT PIN (Screen 10)
              if (_phase == OrderPhase.arrived) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFF0F766E), width: 2),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF0F766E).withValues(alpha: 0.08),
                        blurRadius: 16,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      const Icon(Icons.check_circle_rounded,
                          color: Color(0xFF047857), size: 48),
                      const SizedBox(height: 12),
                      const Text(
                        'Assistant Has Arrived Outside!',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Share this 4-Digit PIN with Rahul to start work:',
                        style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),

                      // 4-Digit Arrival PIN Box
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 28, vertical: 12),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: const Color(0xFFCBD5E1)),
                        ),
                        child: Text(
                          _arrivalPin,
                          style: const TextStyle(
                            fontSize: 34,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 10,
                            color: Color(0xFF0F766E),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      const Text(
                        '10-Minute Doorstep Wait Policy in effect',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF94A3B8),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                _buildPartnerCard(),
                const SizedBox(height: 24),

                ElevatedButton(
                  onPressed: _startBillingMeter,
                  child: const Text('Simulate: PIN Verified & Start Work'),
                ),
              ],

              // PHASE 3: ACTIVE WORK METER (Screen 11)
              if (_phase == OrderPhase.inProgress) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        'AUTHORITATIVE WORK TIMER',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.2,
                          color: Color(0xFF64748B),
                        ),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        _formatTimer(_elapsedSeconds),
                        style: const TextStyle(
                          fontSize: 44,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF0F766E),
                          letterSpacing: -1,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFEF3C7),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text(
                          'Minimum 30-Minute Guarantee Applied',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF92400E),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                _buildPartnerCard(),
                const SizedBox(height: 24),

                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF047857),
                  ),
                  onPressed: _completeTask,
                  child: const Text('Simulate: Partner Slides Complete Task'),
                ),
              ],

              // PHASE 4: FINAL INVOICE & RECEIPT (Screen 14)
              if (_phase == OrderPhase.completed) ...[
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Center(
                        child: Icon(Icons.task_alt_rounded,
                            color: Color(0xFF047857), size: 52),
                      ),
                      const SizedBox(height: 12),
                      const Center(
                        child: Text(
                          'Task Completed Successfully',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                      ),
                      const Divider(height: 32),
                      _buildReceiptRow('Elapsed Time', '${_elapsedSeconds ~/ 60} mins'),
                      const SizedBox(height: 8),
                      _buildReceiptRow(
                          'Billable Commitment', '$billableMinutes mins (Floor Applied)'),
                      const SizedBox(height: 8),
                      _buildReceiptRow('Base Rate', '₹${baseRate.toStringAsFixed(2)} / min'),
                      const SizedBox(height: 8),
                      _buildReceiptRow('Gross Task Subtotal', '₹${grossAmount.toStringAsFixed(2)}'),
                      const SizedBox(height: 8),
                      _buildReceiptRow(
                        'Assistant Tip (100% Direct)',
                        '+ ₹${tipAmount.toStringAsFixed(2)}',
                        color: const Color(0xFF047857),
                      ),
                      const Divider(height: 24),
                      _buildReceiptRow(
                        'TOTAL AMOUNT DUE',
                        '₹${totalPayable.toStringAsFixed(2)}',
                        isBold: true,
                      ),
                      const SizedBox(height: 14),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          'Please pay ₹105.00 directly to assistant Rahul via Cash or scan his UPI QR at your doorstep.',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF334155),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Payment Confirmed. Thank you for using DoNow!'),
                        backgroundColor: Color(0xFF0F766E),
                      ),
                    );
                    Navigator.of(context).pushNamedAndRemoveUntil(
                      '/home',
                      (route) => false,
                    );
                  },
                  child: const Text('I Have Paid Assistant & Return Home'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPartnerCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 26,
            backgroundColor: const Color(0xFF0F766E).withValues(alpha: 0.1),
            child: const Icon(Icons.person_rounded,
                color: Color(0xFF0F766E), size: 30),
          ),
          const SizedBox(width: 14),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      'Rahul Sharma',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF0F172A),
                      ),
                    ),
                    SizedBox(width: 6),
                    Icon(Icons.verified_rounded,
                        color: Color(0xFF047857), size: 16),
                  ],
                ),
                SizedBox(height: 2),
                Text(
                  '★ 4.92 • 148 Tasks Completed',
                  style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                ),
              ],
            ),
          ),
          IconButton.filledTonal(
            icon: const Icon(Icons.phone_rounded, color: Color(0xFF0F766E)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Dialing via Cloud Virtual Number Bridge...'),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildReceiptRow(String title, String value,
      {bool isBold = false, Color? color}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: isBold ? 15 : 13,
            fontWeight: isBold ? FontWeight.w800 : FontWeight.w500,
            color: isBold ? const Color(0xFF0F172A) : const Color(0xFF64748B),
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: isBold ? 17 : 13,
            fontWeight: isBold ? FontWeight.w900 : FontWeight.w700,
            color: color ??
                (isBold ? const Color(0xFF0F766E) : const Color(0xFF0F172A)),
          ),
        ),
      ],
    );
  }
}
