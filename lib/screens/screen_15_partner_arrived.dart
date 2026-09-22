import 'dart:async';
import 'package:flutter/material.dart';

// File: lib/screens/screen_15_partner_arrived.dart
/// Screen 15 — Partner Arrived: 50-metre arrival verification ring, early arrival timer safeguard demonstration, and Start Work trigger
class Screen15PartnerArrived extends StatefulWidget {
  const Screen15PartnerArrived({super.key});

  @override
  State<Screen15PartnerArrived> createState() => _Screen15PartnerArrivedState();
}

class _Screen15PartnerArrivedState extends State<Screen15PartnerArrived> {
  final String _securityPin = '4819';
  bool _pinVerified = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Partner at Doorstep'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // 50m Geofence Verification Ring
              Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFF047857).withValues(alpha: 0.1),
                  border: Border.all(color: const Color(0xFF047857), width: 3),
                ),
                child: const Center(
                  child: Icon(
                    Icons.check_circle_rounded,
                    size: 64,
                    color: Color(0xFF047857),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              const Text(
                'Partner Has Arrived!',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Verified inside 50-metre GPS doorstep radius.',
                style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 28),

              // Early Arrival Timer Safeguard Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F766E).withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF0F766E).withValues(alpha: 0.2)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.timer_outlined, color: Color(0xFF0F766E), size: 24),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Early Arrival Safeguard Active',
                            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF0F766E)),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Billing meter will NEVER start until you provide this 4-digit PIN to the assistant.',
                            style: TextStyle(fontSize: 11, color: Color(0xFF334155), height: 1.3),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 28),

              // Prominent 4-Digit PIN Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 10, offset: const Offset(0, 4)),
                  ],
                ),
                child: Column(
                  children: [
                    const Text(
                      'GIVE THIS 4-DIGIT PIN TO PARTNER',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Color(0xFF64748B), letterSpacing: 1),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      _securityPin,
                      style: const TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 8,
                        color: Color(0xFF0F766E),
                      ),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Partner enters this into their device to trigger meter.',
                      style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                    ),
                  ],
                ),
              ),
              const Spacer(),

              // Start Work Trigger Simulation
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushReplacementNamed('/work-in-progress');
                },
                child: const Text('Simulate PIN Entered (Start Task Timer)'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
