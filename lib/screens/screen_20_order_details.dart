import 'package:flutter/material.dart';

// File: lib/screens/screen_20_order_details.dart
/// Screen 20 — Order Details: Deep dive into order #DN-89210 with status timeline, partner details, and itemized bill breakdown
class Screen20OrderDetails extends StatelessWidget {
  const Screen20OrderDetails({super.key});

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?) ?? {};
    final orderId = (args['id'] as String?) ?? 'DN-89210';
    final service = (args['service'] as String?) ?? 'Queue Waiter (GPO Hazratganj)';
    final partner = (args['partner'] as String?) ?? 'Rahul Sharma';
    final amount = (args['amount'] as String?) ?? '₹340.00';

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text('Order #$orderId'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Card
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
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Service Summary',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF64748B)),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: const Color(0xFF047857).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'COMPLETED',
                            style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Color(0xFF047857)),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      service,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Hazratganj GPO Counter #3 • Lucknow',
                      style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),

              // Status Timeline
              const Text(
                'Audit Timeline',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  children: [
                    _buildTimelineStep('Task Booked', '11:00 AM', isPassed: true),
                    _buildTimelineStep('Rahul Sharma Accepted (3 km ring)', '11:01 AM', isPassed: true),
                    _buildTimelineStep('Doorstep Arrival (50m Geofenced)', '11:08 AM', isPassed: true),
                    _buildTimelineStep('PIN Verified & Meter Started', '11:10 AM', isPassed: true),
                    _buildTimelineStep('Task Completed (150m)', '01:40 PM', isPassed: true, isLast: true),
                  ],
                ),
              ),
              const SizedBox(height: 18),

              // Itemized Bill
              const Text(
                'Itemized Receipt',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  children: [
                    _buildRow('150 minutes served @ ₹2/m', '₹300.00'),
                    _buildRow('Priority Partner Tip', '₹40.00'),
                    _buildRow('Platform Fee to Customer', '₹0.00'),
                    const Divider(height: 20, color: Color(0xFFE2E8F0)),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Total Settled (Cash/UPI)', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900)),
                        Text(amount, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF047857))),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              OutlinedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Downloading official PDF Tax Invoice receipt...')),
                  );
                },
                icon: const Icon(Icons.download_rounded, color: Color(0xFF0F766E)),
                label: const Text('Download Official Invoice (PDF)'),
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size.fromHeight(50),
                  side: const BorderSide(color: Color(0xFF0F766E)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTimelineStep(String title, String time, {required bool isPassed, bool isLast = false}) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 14,
              height: 14,
              decoration: const BoxDecoration(
                color: Color(0xFF047857),
                shape: BoxShape.circle,
              ),
            ),
            if (!isLast)
              Container(
                width: 2,
                height: 28,
                color: const Color(0xFF047857).withValues(alpha: 0.3),
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF0F172A))),
              Text(time, style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
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
