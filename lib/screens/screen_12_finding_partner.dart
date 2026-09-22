import 'dart:async';
import 'package:flutter/material.dart';

// File: lib/screens/screen_12_finding_partner.dart
/// Screen 12 — Finding Partner: Animated matching radar with 3 km → 5 km → 7 km radius expansion
class Screen12FindingPartner extends StatefulWidget {
  const Screen12FindingPartner({super.key});

  @override
  State<Screen12FindingPartner> createState() => _Screen12FindingPartnerState();
}

class _Screen12FindingPartnerState extends State<Screen12FindingPartner>
    with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  int _secondsElapsed = 0;
  int _currentRadiusKm = 3;
  Timer? _timer;
  int _partnersPinged = 6;

  @override
  void initState() {
    super.initState();

    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat();

    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) return;
      setState(() {
        _secondsElapsed++;
        if (_secondsElapsed == 8) {
          _currentRadiusKm = 5;
          _partnersPinged = 14;
        } else if (_secondsElapsed == 16) {
          _currentRadiusKm = 7;
          _partnersPinged = 27;
        } else if (_secondsElapsed >= 22) {
          // Partner matched!
          t.cancel();
          Navigator.of(context).pushReplacementNamed('/partner-accepted');
        }
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A), // High-focus dark radar background
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text('Matching Assistant...', style: TextStyle(color: Colors.white)),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text('Cancel', style: TextStyle(color: Color(0xFFEF4444), fontWeight: FontWeight.w700)),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 20),
            // Dynamic Radius Indicator Pill
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF0F766E)),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: Color(0xFF10B981),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Searching in $_currentRadiusKm km radar • $_partnersPinged Partners Pinged',
                    style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'Ring cycle: 45s per tier (${_secondsElapsed}s elapsed)',
              style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
            ),

            // Animated Radar Core
            Expanded(
              child: Center(
                child: AnimatedBuilder(
                  animation: _pulseController,
                  builder: (context, child) {
                    final val = _pulseController.value;
                    return Stack(
                      alignment: Alignment.center,
                      children: [
                        // Ripple 3
                        Container(
                          width: 280 * (0.6 + val * 0.4),
                          height: 280 * (0.6 + val * 0.4),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: const Color(0xFF0F766E).withValues(alpha: (1.0 - val) * 0.4),
                              width: 1.5,
                            ),
                          ),
                        ),
                        // Ripple 2
                        Container(
                          width: 200 * (0.6 + val * 0.4),
                          height: 200 * (0.6 + val * 0.4),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: const Color(0xFF047857).withValues(alpha: (1.0 - val) * 0.6),
                              width: 2,
                            ),
                          ),
                        ),
                        // Center Core Avatar
                        Container(
                          width: 90,
                          height: 90,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: const LinearGradient(
                              colors: [Color(0xFF0F766E), Color(0xFF047857)],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF0F766E).withValues(alpha: 0.6),
                                blurRadius: 24,
                                spreadRadius: 4,
                              ),
                            ],
                          ),
                          child: const Icon(Icons.person_pin_circle_rounded, color: Colors.white, size: 48),
                        ),
                      ],
                    );
                  },
                ),
              ),
            ),

            // Bottom Add Tip to Accelerate Bar
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Color(0xFF1E293B),
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(24),
                  topRight: Radius.circular(24),
                ),
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      const Icon(Icons.bolt_rounded, color: Color(0xFFF59E0B), size: 24),
                      const SizedBox(width: 10),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Need faster dispatch?',
                              style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w800),
                            ),
                            Text(
                              'Adding a tip boosts priority in partner 45s offer alerts.',
                              style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                            ),
                          ],
                        ),
                      ),
                      OutlinedButton(
                        onPressed: () {
                          Navigator.of(context).pushNamed('/tip');
                        },
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Color(0xFFF59E0B)),
                          foregroundColor: const Color(0xFFF59E0B),
                        ),
                        child: const Text('Add Tip'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    '100% of tip goes directly to the partner alongside cash/UPI settlement.',
                    style: TextStyle(color: Color(0xFF64748B), fontSize: 10),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
