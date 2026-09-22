import 'package:flutter/material.dart';

// File: lib/screens/screen_14_partner_accepted.dart
/// Screen 14 — Partner Accepted: Rahul Sharma profile (4.8★, Best badge, ETA 8 min), live map tracking, and masked Call/Message buttons
class Screen14PartnerAccepted extends StatefulWidget {
  const Screen14PartnerAccepted({super.key});

  @override
  State<Screen14PartnerAccepted> createState() => _Screen14PartnerAcceptedState();
}

class _Screen14PartnerAcceptedState extends State<Screen14PartnerAccepted> {
  final String _partnerName = 'Rahul Sharma';
  final double _rating = 4.8;
  final int _completedTasks = 342;
  final int _etaMins = 8;
  final String _securityPin = '4819';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Partner En Route'),
        actions: [
          IconButton(
            icon: const Icon(Icons.shield_outlined, color: Color(0xFF0F766E)),
            onPressed: () {
              Navigator.of(context).pushNamed('/sos');
            },
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Live Map View (Simulated GPS Tracking)
            Expanded(
              flex: 5,
              child: Stack(
                children: [
                  Container(
                    width: double.infinity,
                    color: const Color(0xFFE2E8F0),
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: const Color(0xFF0F766E),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(Icons.directions_bike_rounded, color: Colors.white, size: 16),
                                const SizedBox(width: 6),
                                Text(
                                  'Rahul is $_etaMins mins away (1.4 km)',
                                  style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 8),
                          const Icon(Icons.two_wheeler_rounded, size: 40, color: Color(0xFF0F766E)),
                        ],
                      ),
                    ),
                  ),

                  // 4-Digit Security PIN Banner (Doorstep handoff)
                  Positioned(
                    top: 16,
                    left: 16,
                    right: 16,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 8, offset: Offset(0, 3))],
                        border: Border.all(color: const Color(0xFF0F766E).withValues(alpha: 0.3)),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Doorstep Start PIN',
                                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Color(0xFF64748B)),
                              ),
                              Text(
                                'Share only upon physical arrival',
                                style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                              ),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                            decoration: BoxDecoration(
                              color: const Color(0xFF0F766E).withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              _securityPin,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 3,
                                color: Color(0xFF0F766E),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Partner Profile & Action Drawer
            Expanded(
              flex: 5,
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(24),
                    topRight: Radius.circular(24),
                  ),
                  boxShadow: [
                    BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, -3)),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Profile Header
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 28,
                          backgroundColor: const Color(0xFF0F766E).withValues(alpha: 0.15),
                          child: const Icon(Icons.person_rounded, size: 36, color: Color(0xFF0F766E)),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    _partnerName,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.w800,
                                      color: Color(0xFF0F172A),
                                    ),
                                  ),
                                  const SizedBox(width: 6),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFF047857),
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: const Text(
                                      'BEST',
                                      style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w800),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              Row(
                                children: [
                                  const Icon(Icons.star_rounded, color: Color(0xFFF59E0B), size: 16),
                                  const SizedBox(width: 4),
                                  Text(
                                    '$_rating ($_completedTasks tasks)',
                                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF475569)),
                                  ),
                                  const SizedBox(width: 8),
                                  const Text('• 100% KYC', style: TextStyle(fontSize: 11, color: Color(0xFF047857), fontWeight: FontWeight.w600)),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),

                    // Masked Contact Controls
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Connecting via Virtual Masked VoIP (+91 7948-XXXXXX)...')),
                              );
                            },
                            icon: const Icon(Icons.call_rounded, size: 18, color: Color(0xFF0F766E)),
                            label: const Text('Call Masked'),
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Color(0xFF0F766E)),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Opening encrypted in-app chat session...')),
                              );
                            },
                            icon: const Icon(Icons.chat_bubble_outline_rounded, size: 18, color: Color(0xFF0F766E)),
                            label: const Text('Chat'),
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Color(0xFF0F766E)),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const Spacer(),

                    // Simulate Arrival Button
                    ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).pushReplacementNamed('/partner-arrived');
                      },
                      child: const Text('Simulate Partner Doorstep Arrival'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
