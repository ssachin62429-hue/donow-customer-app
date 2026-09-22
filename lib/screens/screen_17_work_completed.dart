import 'package:flutter/material.dart';

// File: lib/screens/screen_17_work_completed.dart
/// Screen 17 — Work Completed: Itemized receipt (150 mins served, ₹300 service fare, ₹40 tip, ₹340 total) with Cash/UPI payment confirmation
class Screen17WorkCompleted extends StatefulWidget {
  const Screen17WorkCompleted({super.key});

  @override
  State<Screen17WorkCompleted> createState() => _Screen17WorkCompletedState();
}

class _Screen17WorkCompletedState extends State<Screen17WorkCompleted> {
  String _selectedPaymentMethod = 'UPI QR / App';
  bool _isPaidConfirmed = false;

  final int _minsServed = 150;
  final double _serviceFare = 300.00; // 150m @ ₹2/m
  final double _tip = 40.00;
  double get _totalAmount => _serviceFare + _tip;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Task Invoice & Settlement'),
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Completion Tick
              Container(
                width: 72,
                height: 72,
                decoration: const BoxDecoration(
                  color: Color(0xFF047857),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check_rounded, color: Colors.white, size: 44),
              ),
              const SizedBox(height: 14),
              const Text(
                'Task Successfully Completed!',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Order #DN-89210 • Hazratganj GPO Line Waiting',
                style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 20),

              // Itemized Bill Breakdown Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withValues(alpha: 0.03), blurRadius: 10, offset: const Offset(0, 3)),
                  ],
                ),
                child: Column(
                  children: [
                    _buildRow('Total Service Time', '$_minsServed minutes'),
                    _buildRow('Base Rate Applied', '₹2.00 / minute'),
                    _buildRow('Service Fare', '₹${_serviceFare.toStringAsFixed(2)}'),
                    _buildRow('Partner Priority Tip (100%)', '₹${_tip.toStringAsFixed(2)}'),
                    const Divider(height: 24, color: Color(0xFFE2E8F0)),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Total Payable',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
                        ),
                        Text(
                          '₹${_totalAmount.toStringAsFixed(2)}',
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFF047857),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Payment Method Direct Choice
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Choose Direct Settlement Method',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Pay Rahul Sharma directly. DoNow does not hold platform escrow.',
                      style: TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                    ),
                    const SizedBox(height: 14),
                    RadioListTile<String>(
                      value: 'UPI QR / App',
                      groupValue: _selectedPaymentMethod,
                      activeColor: const Color(0xFF0F766E),
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Scan Partner UPI QR / PhonePe / GPay', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                      onChanged: (v) => setState(() => _selectedPaymentMethod = v!),
                    ),
                    RadioListTile<String>(
                      value: 'Physical Cash',
                      groupValue: _selectedPaymentMethod,
                      activeColor: const Color(0xFF0F766E),
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Pay ₹340 in Direct Cash', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                      onChanged: (v) => setState(() => _selectedPaymentMethod = v!),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              CheckboxListTile(
                value: _isPaidConfirmed,
                activeColor: const Color(0xFF0F766E),
                contentPadding: EdgeInsets.zero,
                title: const Text(
                  'I have handed ₹340 in Cash or transferred via UPI directly to Rahul Sharma.',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF334155)),
                ),
                onChanged: (v) => setState(() => _isPaidConfirmed = v ?? false),
              ),
              const SizedBox(height: 20),

              ElevatedButton(
                onPressed: _isPaidConfirmed
                    ? () {
                        Navigator.of(context).pushReplacementNamed('/rate-partner');
                      }
                    : null,
                child: const Text('Confirm Payment & Rate Partner'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 13, color: Color(0xFF64748B))),
          Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF0F172A))),
        ],
      ),
    );
  }
}
