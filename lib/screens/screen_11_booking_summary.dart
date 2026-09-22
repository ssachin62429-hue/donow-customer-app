import 'package:flutter/material.dart';

// File: lib/screens/screen_11_booking_summary.dart
/// Screen 11 — Booking Summary: Complete task overview, duration, estimated fare, and single-tap BOOK NOW
class Screen11BookingSummary extends StatefulWidget {
  const Screen11BookingSummary({super.key});

  @override
  State<Screen11BookingSummary> createState() => _Screen11BookingSummaryState();
}

class _Screen11BookingSummaryState extends State<Screen11BookingSummary> {
  String _paymentMode = 'Cash / UPI Direct';
  int _selectedTip = 20;

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?) ?? {};
    final taskDesc = (args['task_description'] as String?) ?? 'Govt Office & Queue Waiting at GPO Hazratganj';
    final serviceName = (args['service_name'] as String?) ?? 'Govt Office & Queue Waiting';
    final ratePerMin = (args['rate'] as double?) ?? 2.00;
    final estimatedMins = (args['estimated_mins'] as int?) ?? 45;
    final address = (args['address'] as String?) ?? 'Hazratganj Main Market, Lucknow';
    final landmark = (args['landmark'] as String?) ?? 'Opposite Cathedral School Main Gate';

    final baseFare = (estimatedMins * ratePerMin);
    final totalFare = baseFare + _selectedTip;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Review & Book'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Order Summary Card
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
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: const Color(0xFF0F766E).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Icon(Icons.assignment_outlined, color: Color(0xFF0F766E), size: 20),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            serviceName,
                            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      taskDesc,
                      style: const TextStyle(fontSize: 13, color: Color(0xFF334155), height: 1.4),
                    ),
                    const SizedBox(height: 14),
                    const Divider(height: 1, color: Color(0xFFF1F5F9)),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        const Icon(Icons.place_outlined, size: 18, color: Color(0xFF64748B)),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(address, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF0F172A))),
                              Text('Landmark: $landmark', style: const TextStyle(fontSize: 11, color: Color(0xFF64748B))),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Billing Details Breakdown Card
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
                      'Transparent Fare Calculation',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 12),
                    _buildBillRow('Base Rate per minute', '₹${ratePerMin.toStringAsFixed(2)} / min'),
                    _buildBillRow('Estimated Duration', '$estimatedMins mins'),
                    _buildBillRow('30-Min Minimum Floor', 'Enforced (₹${(ratePerMin * 30).toStringAsFixed(2)})'),
                    _buildBillRow('Estimated Service Fare', '₹${baseFare.toStringAsFixed(2)}'),
                    if (_selectedTip > 0) _buildBillRow('Partner Tip (100% Direct)', '₹$_selectedTip'),
                    const Divider(height: 20, color: Color(0xFFE2E8F0)),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Estimated Total',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
                        ),
                        Text(
                          '₹${totalFare.toStringAsFixed(2)}',
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Color(0xFF047857)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      '*Actual bill is calculated to the second when partner taps "Work Completed" (min 30m applies).',
                      style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Payment Disclaimer Card
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFF047857).withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF047857).withValues(alpha: 0.2)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.payment_rounded, color: Color(0xFF047857), size: 22),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Direct Peer-to-Peer Settlement',
                            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF047857)),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Pay partner directly via Cash or any UPI app (GPay/PhonePe/Paytm) at job conclusion. No platform escrow.',
                            style: TextStyle(fontSize: 11, color: Color(0xFF0F172A)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushNamed(
                    '/finding-partner',
                    arguments: {
                      ...args,
                      'estimated_fare': totalFare,
                      'tip': _selectedTip,
                    },
                  );
                },
                child: const Text('BOOK NOW (Dispatch Assistant)'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBillRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 13, color: Color(0xFF64748B))),
          Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF0F172A))),
        ],
      ),
    );
  }
}
