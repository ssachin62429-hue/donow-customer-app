// File: lib/partner/screens/partner_home_screen.dart
import 'dart:async';
import 'package:flutter/material.dart';
import '../services/partner_state_service.dart';
import '../models/partner_task.dart';
import 'partner_active_task_screen.dart';
import 'partner_earnings_screen.dart';
import 'partner_profile_screen.dart';

class PartnerHomeScreen extends StatefulWidget {
  const PartnerHomeScreen({super.key});

  @override
  State<PartnerHomeScreen> createState() => _PartnerHomeScreenState();
}

class _PartnerHomeScreenState extends State<PartnerHomeScreen> {
  final PartnerStateService _partnerService = PartnerStateService();
  int _selectedTabIndex = 0;
  Timer? _radarCountdownTimer;
  int _radarSecondsLeft = 30;
  bool _showingIncomingSheet = false;

  @override
  void initState() {
    super.initState();
    _partnerService.addListener(_onStateChange);
  }

  @override
  void dispose() {
    _radarCountdownTimer?.cancel();
    _partnerService.removeListener(_onStateChange);
    super.dispose();
  }

  void _onStateChange() {
    if (mounted) setState(() {});
  }

  void _triggerIncomingRadar() {
    if (_partnerService.dutyStatus == PartnerDutyStatus.offline) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please go ONLINE first to receive queue tasks!'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    _partnerService.receiveNewTask(
      orderId: 'DN-${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}',
      customerName: 'Amit Verma',
      serviceName: 'Govt Office & Queue Waiting',
      landmark: 'Hazratganj GPO, Counter 4 Gate',
      securityPin: '7482',
    );

    _radarSecondsLeft = 30;
    _radarCountdownTimer?.cancel();
    _radarCountdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_radarSecondsLeft > 0) {
        if (mounted) {
          setState(() {
            _radarSecondsLeft--;
          });
        }
      } else {
        timer.cancel();
        if (mounted && _showingIncomingSheet) {
          Navigator.pop(context);
          _showingIncomingSheet = false;
        }
      }
    });

    _showIncomingTaskModal();
  }

  void _showIncomingTaskModal() {
    _showingIncomingSheet = true;
    showModalBottomSheet(
      context: context,
      isDismissible: false,
      enableDrag: false,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Color(0xFF0F172A), // Dark High-Contrast Emergency Alert
                borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black45,
                    blurRadius: 20,
                    spreadRadius: 5,
                  ),
                ],
              ),
              child: SafeArea(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Top Pulsing Indicator & Countdown
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: const Color(0xFF0F766E).withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: const Color(0xFF14B8A6)),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.radar, color: Color(0xFF2DD4BF), size: 16),
                              SizedBox(width: 6),
                              Text(
                                'NEW QUEUE TASK NEARBY',
                                style: TextStyle(
                                  color: Color(0xFF2DD4BF),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                        // 30s Countdown Ring
                        CircleAvatar(
                          radius: 18,
                          backgroundColor: Colors.amber.shade700,
                          child: Text(
                            '$_radarSecondsLeft',
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Service Name & Rate
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: const Icon(Icons.hourglass_bottom, color: Colors.amber, size: 28),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _partnerService.currentTask?.serviceName ?? 'Govt Office Queue Waiting',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 18,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: Colors.teal.shade900,
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: const Text(
                                      '₹2.00 / Min',
                                      style: TextStyle(
                                        color: Color(0xFF2DD4BF),
                                        fontWeight: FontWeight.bold,
                                        fontSize: 13,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  const Text(
                                    '₹60 Min Guaranteed',
                                    style: TextStyle(color: Colors.white70, fontSize: 13),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Location & Distance
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.06),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: Colors.white12),
                      ),
                      child: Column(
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.location_on, color: Colors.redAccent, size: 20),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  _partnerService.currentTask?.landmark ?? 'Hazratganj GPO, Counter 4 Gate',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w600,
                                    fontSize: 15,
                                  ),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.white10,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: const Text(
                                  '1.2 km away',
                                  style: TextStyle(color: Colors.white70, fontSize: 12),
                                ),
                              ),
                            ],
                          ),
                          const Divider(color: Colors.white12, height: 16),
                          Row(
                            children: [
                              const Icon(Icons.person_pin, color: Colors.blueAccent, size: 18),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  'Customer: ${_partnerService.currentTask?.customerName ?? "Amit Verma"}',
                                  style: const TextStyle(color: Colors.white70, fontSize: 13),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Action Buttons (Decline / Accept)
                    Row(
                      children: [
                        Expanded(
                          flex: 1,
                          child: OutlinedButton(
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Colors.white30),
                              padding: const EdgeInsets.symmetric(vertical: 14),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            ),
                            onPressed: () {
                              _radarCountdownTimer?.cancel();
                              Navigator.pop(context);
                              _showingIncomingSheet = false;
                            },
                            child: const Text('Pass (Skip)', style: TextStyle(color: Colors.white70)),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          flex: 2,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF0F766E),
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 14),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                              elevation: 4,
                            ),
                            onPressed: () {
                              _radarCountdownTimer?.cancel();
                              Navigator.pop(context);
                              _showingIncomingSheet = false;
                              _partnerService.acceptTask();
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const PartnerActiveTaskScreen(),
                                ),
                              );
                            },
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.check_circle, size: 20),
                                SizedBox(width: 8),
                                Text(
                                  'ACCEPT TASK',
                                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_selectedTabIndex == 1) {
      return const PartnerEarningsScreen();
    } else if (_selectedTabIndex == 2) {
      return const PartnerProfileScreen();
    }

    final isOnline = _partnerService.dutyStatus == PartnerDutyStatus.online;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFF0F766E).withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.support_agent, color: Color(0xFF0F766E), size: 22),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Text(
                      'DoNow Sathi',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17, color: Color(0xFF0F172A)),
                    ),
                    SizedBox(width: 6),
                    Icon(Icons.verified, color: Colors.blue, size: 16),
                  ],
                ),
                Text(
                  _partnerService.partnerName,
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Switch to Customer App Pill
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: ActionChip(
              avatar: const Icon(Icons.swap_horiz, size: 16, color: Color(0xFF0F766E)),
              label: const Text('Customer App', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
              backgroundColor: const Color(0xFFE6FFFA),
              side: const BorderSide(color: Color(0xFF2DD4BF)),
              onPressed: () {
                Navigator.pushReplacementNamed(context, '/home');
              },
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Top Duty Toggle Banner
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              color: isOnline ? const Color(0xFF0F766E) : const Color(0xFF334155),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 14,
                        height: 14,
                        decoration: BoxDecoration(
                          color: isOnline ? const Color(0xFF4ADE80) : Colors.redAccent,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: isOnline ? const Color(0xFF4ADE80).withOpacity(0.6) : Colors.transparent,
                              blurRadius: 8,
                              spreadRadius: 2,
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            isOnline ? 'YOU ARE ONLINE' : 'YOU ARE OFFLINE',
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          Text(
                            isOnline ? 'Ready to receive queue tasks in Lucknow' : 'Turn on duty to start earning',
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.8),
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Transform.scale(
                    scale: 1.1,
                    child: Switch(
                      value: isOnline,
                      activeColor: Colors.white,
                      activeTrackColor: const Color(0xFF14B8A6),
                      inactiveThumbColor: Colors.white,
                      inactiveTrackColor: Colors.grey.shade600,
                      onChanged: (val) {
                        _partnerService.toggleDuty();
                      },
                    ),
                  ),
                ],
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Today's Earnings Card
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.08),
                          blurRadius: 15,
                          offset: const Offset(0, 6),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              "TODAY'S EARNINGS",
                              style: TextStyle(
                                color: Colors.white60,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 1.0,
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.teal.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: Colors.tealAccent.withOpacity(0.3)),
                              ),
                              child: const Row(
                                children: [
                                  Icon(Icons.bolt, color: Colors.tealAccent, size: 14),
                                  SizedBox(width: 4),
                                  Text(
                                    '₹2 / Min Rate',
                                    style: TextStyle(color: Colors.tealAccent, fontSize: 11, fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '₹${_partnerService.todayEarnings.toStringAsFixed(0)}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 34,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        const SizedBox(height: 16),
                        const Divider(color: Colors.white12),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            _buildStatItem('Completed Tasks', '${_partnerService.todayCompletedTasks}', Icons.task_alt),
                            _buildStatItem('Hours on Duty', '${_partnerService.todayHoursOnline} hrs', Icons.access_time),
                            _buildStatItem('Acceptance', '${_partnerService.acceptanceRate}%', Icons.thumb_up_alt_outlined),
                          ],
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Simulate Incoming Order CTA
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF0FDF4),
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: const Color(0xFF86EFAC)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.notifications_active, color: Color(0xFF16A34A), size: 22),
                            SizedBox(width: 8),
                            Text(
                              'Test Incoming Task Radar',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                                color: Color(0xFF14532D),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Simulate a real customer placing a queue order in Hazratganj GPO to test the 30-sec radar & PIN verification.',
                          style: TextStyle(fontSize: 13, color: Colors.green.shade800),
                        ),
                        const SizedBox(height: 12),
                        ElevatedButton.icon(
                          onPressed: _triggerIncomingRadar,
                          icon: const Icon(Icons.play_arrow, size: 18),
                          label: const Text('Simulate Incoming Task (Radar Alert)'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF16A34A),
                            foregroundColor: Colors.white,
                            minimumSize: const Size.fromHeight(46),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Quick Action Hub
                  const Text(
                    'Partner Essentials',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: _buildActionTile(
                          icon: Icons.qr_code_scanner,
                          title: 'My UPI QR',
                          subtitle: 'Receive directly',
                          color: Colors.indigo,
                          onTap: () {
                            _showPartnerQrModal();
                          },
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _buildActionTile(
                          icon: Icons.shield_outlined,
                          title: 'Aadhaar Verified',
                          subtitle: 'UIDAI Linked',
                          color: const Color(0xFF0F766E),
                          onTap: () {
                            setState(() => _selectedTabIndex = 2);
                          },
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedTabIndex,
        selectedItemColor: const Color(0xFF0F766E),
        unselectedItemColor: Colors.grey.shade500,
        backgroundColor: Colors.white,
        elevation: 8,
        onTap: (index) {
          setState(() {
            _selectedTabIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.radar),
            label: 'Duty & Radar',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_balance_wallet_outlined),
            label: 'Earnings',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            label: 'Sathi Profile',
          ),
        ],
      ),
    );
  }

  void _showPartnerQrModal() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'My UPI QR (Direct Settlement)',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text(
                'Customers scan this QR code to transfer queue fare directly into your bank.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey, fontSize: 13),
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.shade300),
                  boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 10)],
                ),
                child: const Icon(Icons.qr_code_2, size: 160, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 12),
              const Text(
                'UPI ID: rahul.sharma@okaxis',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Close'),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildStatItem(String label, String value, IconData icon) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, color: Colors.tealAccent, size: 14),
            const SizedBox(width: 4),
            Text(label, style: const TextStyle(color: Colors.white70, fontSize: 11)),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ],
    );
  }

  Widget _buildActionTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade200),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 8, offset: const Offset(0, 4)),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 22),
            ),
            const SizedBox(height: 12),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 2),
            Text(subtitle, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
          ],
        ),
      ),
    );
  }
}
