import 'dart:async';
import 'package:flutter/material.dart';

// File: lib/screens/screen_16_work_in_progress.dart
/// Screen 16 — Work In Progress: Live running timer, current fare counter, location tracker, and direct SOS access
class Screen16WorkInProgress extends StatefulWidget {
  const Screen16WorkInProgress({super.key});

  @override
  State<Screen16WorkInProgress> createState() => _Screen16WorkInProgressState();
}

class _Screen16WorkInProgressState extends State<Screen16WorkInProgress> {
  int _secondsElapsed = 150 * 60; // Start at 150 mins for demo per specs
  Timer? _timer;
  final double _ratePerMin = 2.00;
  final int _tip = 40;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() => _secondsElapsed++);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String _formatDuration(int totalSeconds) {
    final int hours = totalSeconds ~/ 3600;
    final int minutes = (totalSeconds % 3600) ~/ 60;
    final int seconds = totalSeconds % 60;
    return '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final minutesServed = (_secondsElapsed / 60).ceil();
    // 30-minute minimum billing floor rule
    final billableMinutes = minutesServed < 30 ? 30 : minutesServed;
    final currentFare = billableMinutes * _ratePerMin;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Live Task Session'),
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.shield_rounded, color: Color(0xFFDC2626)),
            onPressed: () => Navigator.of(context).pushNamed('/sos'),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            children: [
              // Live Status Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF047857).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFF047857).withValues(alpha: 0.3)),
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.fiber_manual_record_rounded, color: Color(0xFF047857), size: 14),
                    SizedBox(width: 6),
                    Text(
                      'TASK IN PROGRESS (ACTIVE METER)',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 0.5,
                        color: Color(0xFF047857),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Running Digital Stopwatch Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withValues(alpha: 0.03), blurRadius: 12, offset: const Offset(0, 4)),
                  ],
                ),
                child: Column(
                  children: [
                    const Text(
                      'ACTIVE DURATION',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF64748B), letterSpacing: 1),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _formatDuration(_secondsElapsed),
                      style: const TextStyle(
                        fontSize: 44,
                        fontWeight: FontWeight.w900,
                        fontFeatures: [FontFeature.tabularFigures()],
                        letterSpacing: 2,
                        color: Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      '$minutesServed mins served (Floor: 30m min)',
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF0F766E)),
                    ),
                    const SizedBox(height: 20),
                    const Divider(height: 1, color: Color(0xFFF1F5F9)),
                    const SizedBox(height: 16),

                    // Running Fare Counter
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Current Accrued Fare',
                              style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                            ),
                            Text(
                              'Rate: ₹2.00 / min',
                              style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                            ),
                          ],
                        ),
                        Text(
                          '₹${currentFare.toStringAsFixed(2)}',
                          style: const TextStyle(
                            fontSize: 26,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFF047857),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),

              // Partner Active Mini-Card
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Row(
                  children: [
                    const CircleAvatar(
                      backgroundColor: Color(0xFFE0F2FE),
                      child: Icon(Icons.person_rounded, color: Color(0xFF0284C7)),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Rahul Sharma',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: Color(0xFF0F172A)),
                          ),
                          Text(
                            'Holding queue spot at Hazratganj GPO',
                            style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.call_rounded, color: Color(0xFF0F766E)),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Connecting to customer via DoNow masked proxy relay...'),
                            backgroundColor: Color(0xFF0F766E),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const Spacer(),

              // Emergency SOS Direct Access
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => Navigator.of(context).pushNamed('/sos'),
                      icon: const Icon(Icons.warning_amber_rounded, color: Color(0xFFDC2626)),
                      label: const Text('SOS / 112 Help', style: TextStyle(color: Color(0xFFDC2626))),
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: Color(0xFFDC2626)),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Partner Completes Task
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushReplacementNamed('/work-completed');
                },
                child: const Text('Simulate Partner "Work Completed"'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
