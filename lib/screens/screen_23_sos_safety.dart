import 'package:flutter/material.dart';

// File: lib/screens/screen_23_sos_safety.dart
/// Screen 23 — SOS & Safety: Direct 112 National Emergency button, 24x7 DoNow Safety hotline, and GPS distress alert simulation
class Screen23SosSafety extends StatefulWidget {
  const Screen23SosSafety({super.key});

  @override
  State<Screen23SosSafety> createState() => _Screen23SosSafetyState();
}

class _Screen23SosSafetyState extends State<Screen23SosSafety> {
  bool _distressAlertTriggered = false;

  void _triggerDistress() {
    setState(() => _distressAlertTriggered = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: Color(0xFFDC2626),
        content: Text('EMERGENCY DISTRESS BEACON SENT: Live GPS coordinates broadcast to DoNow Safety Ops & Local Authorities.'),
        duration: Duration(seconds: 4),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Safety & Emergency (SOS)'),
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Emergency Warning Header
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFDC2626).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFDC2626).withValues(alpha: 0.3)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.shield_rounded, color: Color(0xFFDC2626), size: 32),
                    SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Emergency Response Center',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFFDC2626)),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'If you feel unsafe or are in immediate physical danger, use the buttons below immediately.',
                            style: TextStyle(fontSize: 12, color: Color(0xFF334155), height: 1.3),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Giant National 112 Direct Button
              GestureDetector(
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Calling National Emergency Helpline: 112...'),
                    ),
                  );
                },
                child: Container(
                  width: 170,
                  height: 170,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const LinearGradient(
                      colors: [Color(0xFFEF4444), Color(0xFFB91C1C)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFFDC2626).withValues(alpha: 0.4),
                        blurRadius: 20,
                        spreadRadius: 4,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.call_rounded, color: Colors.white, size: 48),
                        SizedBox(height: 6),
                        Text(
                          'CALL 112',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 22,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 1.5,
                          ),
                        ),
                        Text(
                          'Police / Ambulance',
                          style: TextStyle(color: Colors.white70, fontSize: 10),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // 24x7 DoNow Safety Hotline Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Dialing DoNow 24x7 Incident Response Team (Lucknow)...')),
                    );
                  },
                  icon: const Icon(Icons.support_agent_rounded, size: 22),
                  label: const Text('Call DoNow 24x7 Safety Desk (Toll Free)'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF0F172A),
                    minimumSize: const Size.fromHeight(50),
                  ),
                ),
              ),
              const SizedBox(height: 14),

              // Silent Distress Alert Button
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: _distressAlertTriggered ? null : _triggerDistress,
                  icon: Icon(
                    Icons.broadcast_on_personal_rounded,
                    color: _distressAlertTriggered ? Colors.grey : const Color(0xFFDC2626),
                  ),
                  label: Text(
                    _distressAlertTriggered ? 'Distress Signal Active (Broadcasting)' : 'Send Silent Distress Alert with GPS',
                    style: TextStyle(
                      color: _distressAlertTriggered ? Colors.grey : const Color(0xFFDC2626),
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  style: OutlinedButton.styleFrom(
                    minimumSize: const Size.fromHeight(50),
                    side: BorderSide(
                      color: _distressAlertTriggered ? Colors.grey : const Color(0xFFDC2626),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 28),

              // Safety Guarantees List
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: const Column(
                  children: [
                    _SafetyItem(
                      icon: Icons.badge_outlined,
                      title: '100% Aadhaar & Police Verified Partners',
                      desc: 'All DoNow assistants undergo mandatory biometric identification.',
                    ),
                    Divider(height: 20, color: Color(0xFFF1F5F9)),
                    _SafetyItem(
                      icon: Icons.phone_locked_outlined,
                      title: 'Virtual Masked Phone Numbers',
                      desc: 'Your personal phone number is never shared with the assistant.',
                    ),
                    Divider(height: 20, color: Color(0xFFF1F5F9)),
                    _SafetyItem(
                      icon: Icons.pin_drop_outlined,
                      title: 'Live GPS Session Recording',
                      desc: 'Every active order is monitored in real-time by our safety algorithm.',
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SafetyItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String desc;

  const _SafetyItem({required this.icon, required this.title, required this.desc});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: const Color(0xFF0F766E), size: 22),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF0F172A))),
              const SizedBox(height: 2),
              Text(desc, style: const TextStyle(fontSize: 11, color: Color(0xFF64748B), height: 1.3)),
            ],
          ),
        ),
      ],
    );
  }
}
