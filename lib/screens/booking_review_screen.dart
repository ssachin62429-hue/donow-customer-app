import 'dart:async';
import 'package:flutter/material.dart';
import 'home_screen.dart';

/// Screen 07 & 08: Booking Review, Tip Selector, Payment Mode & Live Radar Modal
class BookingReviewScreen extends StatefulWidget {
  const BookingReviewScreen({super.key});

  @override
  State<BookingReviewScreen> createState() => _BookingReviewScreenState();
}

class _BookingReviewScreenState extends State<BookingReviewScreen> {
  int _selectedTip = 30; // Default tip: ₹30
  String _paymentMode = 'CASH_TO_PARTNER'; // or 'DIRECT_UPI_QR'
  bool _isMatching = false;
  int _matchingSeconds = 0;
  Timer? _matchingTimer;

  @override
  void dispose() {
    _matchingTimer?.cancel();
    super.dispose();
  }

  void _startMatchingProcess(Map<String, dynamic> bookingData) {
    setState(() {
      _isMatching = true;
      _matchingSeconds = 0;
    });

    _matchingTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() => _matchingSeconds++);

      // Simulated match after 4 seconds (Ring 1 3km match)
      if (_matchingSeconds >= 4) {
        timer.cancel();
        if (mounted) {
          Navigator.of(context).pushReplacementNamed(
            '/order-tracking',
            arguments: {
              ...bookingData,
              'order_id': 'ORD-84920',
              'tip_amount': _selectedTip,
              'payment_mode': _paymentMode,
            },
          );
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?) ?? {};
    final service = args['service'] as DoNowService? ?? kCoreServices.first;
    final address = args['address'] as String? ?? 'KGMU Trauma Center, Lucknow';
    final landmark = args['landmark'] as String? ?? 'Gate 2 OPD';

    final minGrossCost = service.baseRatePerMin * service.minDurationMins;
    final estimatedTotal = minGrossCost + _selectedTip;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Review Task & Fare'),
      ),
      body: Stack(
        children: [
          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Service Summary Card
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: const Color(0xFF0F766E).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Icon(service.icon, color: const Color(0xFF0F766E)),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                service.nameEn,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                  color: Color(0xFF0F172A),
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                '$landmark • $address',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: Color(0xFF64748B),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Fare Transparency Card
                  Container(
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Transparent Tariff Breakdown',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 14),
                        _buildFareRow('Base Rate per Minute',
                            '₹${service.baseRatePerMin.toStringAsFixed(2)}/min'),
                        const SizedBox(height: 8),
                        _buildFareRow('Minimum Billing Floor',
                            '${service.minDurationMins} Mins (₹${minGrossCost.toStringAsFixed(2)})'),
                        const SizedBox(height: 8),
                        _buildFareRow(
                          'Assistant Tip (100% Pass-Through)',
                          '+ ₹$_selectedTip.00',
                          valueColor: const Color(0xFF047857),
                        ),
                        const Divider(height: 24),
                        _buildFareRow(
                          'Estimated Total (Doorstep)',
                          '₹${estimatedTotal.toStringAsFixed(2)}',
                          isBold: true,
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Note: Meter starts only when assistant verifies doorstep arrival. Actual bill scales if task exceeds 30 minutes.',
                          style: TextStyle(
                            fontSize: 11,
                            color: Color(0xFF64748B),
                            height: 1.3,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Tip Selector (100% to Assistant)
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Text(
                              'Add Tip for Field Assistant',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w700,
                                color: Color(0xFF0F172A),
                              ),
                            ),
                            const Spacer(),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: const Color(0xFFFEF3C7),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: const Text(
                                '0% Commission',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w700,
                                  color: Color(0xFF92400E),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [0, 20, 30, 50].map((tip) {
                            final isSelected = _selectedTip == tip;
                            return ChoiceChip(
                              label: Text(tip == 0 ? 'No Tip' : '+₹$tip'),
                              selected: isSelected,
                              onSelected: (_) => setState(() => _selectedTip = tip),
                              selectedColor: const Color(0xFF0F766E),
                              labelStyle: TextStyle(
                                color: isSelected ? Colors.white : const Color(0xFF0F172A),
                                fontWeight: FontWeight.w600,
                              ),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Direct P2P Payment Mode Selector
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Payment Mode (Paid Directly to Assistant)',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                        const SizedBox(height: 8),
                        RadioListTile<String>(
                          value: 'CASH_TO_PARTNER',
                          groupValue: _paymentMode,
                          activeColor: const Color(0xFF0F766E),
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Cash at Doorstep',
                              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                          subtitle: const Text('Pay physical cash after task completion',
                              style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                          onChanged: (val) => setState(() => _paymentMode = val!),
                        ),
                        RadioListTile<String>(
                          value: 'DIRECT_UPI_QR',
                          groupValue: _paymentMode,
                          activeColor: const Color(0xFF0F766E),
                          contentPadding: EdgeInsets.zero,
                          title: const Text('Direct UPI (Scan Assistant QR)',
                              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                          subtitle: const Text('Scan personal GPay/PhonePe QR at doorstep',
                              style: TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                          onChanged: (val) => setState(() => _paymentMode = val!),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),

                  // Confirm & Book Button
                  ElevatedButton(
                    onPressed: () => _startMatchingProcess({
                      'service': service,
                      'address': address,
                      'landmark': landmark,
                    }),
                    child: const Text('Slide / Tap to Book Assistant'),
                  ),
                ],
              ),
            ),
          ),

          // Screen 08: Full-Screen Matching Radar Overlay
          if (_isMatching)
            Container(
              color: const Color(0xFF0F172A).withValues(alpha: 0.88),
              width: double.infinity,
              height: double.infinity,
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.all(32),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Concentric Pulsing Radar Icon
                      Stack(
                        alignment: Alignment.center,
                        children: [
                          Container(
                            width: 140,
                            height: 140,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: const Color(0xFF0F766E).withValues(alpha: 0.2),
                            ),
                          ),
                          Container(
                            width: 100,
                            height: 100,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: const Color(0xFF0F766E).withValues(alpha: 0.4),
                            ),
                          ),
                          const Icon(
                            Icons.radar_rounded,
                            size: 48,
                            color: Colors.white,
                          ),
                        ],
                      ),
                      const SizedBox(height: 32),
                      const Text(
                        'Broadcasting to Nearby Assistants',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _matchingSeconds < 45
                            ? 'Ring 1: Searching within 3 km radius...'
                            : 'Ring 2: Expanding search to 5 km...',
                        style: const TextStyle(
                          color: Color(0xFF94A3B8),
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 36),
                      OutlinedButton(
                        onPressed: () {
                          _matchingTimer?.cancel();
                          setState(() => _isMatching = false);
                        },
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.white,
                          side: const BorderSide(color: Colors.white38),
                        ),
                        child: const Text('Cancel Search (Free)'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildFareRow(String title, String value,
      {bool isBold = false, Color? valueColor}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: isBold ? 15 : 13,
            fontWeight: isBold ? FontWeight.w800 : FontWeight.w500,
            color: isBold ? const Color(0xFF0F172A) : const Color(0xFF475569),
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: isBold ? 16 : 13,
            fontWeight: isBold ? FontWeight.w800 : FontWeight.w600,
            color: valueColor ??
                (isBold ? const Color(0xFF0F766E) : const Color(0xFF0F172A)),
          ),
        ),
      ],
    );
  }
}
