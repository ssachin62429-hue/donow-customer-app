import 'package:flutter/material.dart';

// File: lib/screens/screen_06_home_dashboard.dart
/// Screen 6 — Home Dashboard: Active partner counter, location selector, quick task inputs, and 10 categories
class Screen06HomeDashboard extends StatefulWidget {
  const Screen06HomeDashboard({super.key});

  @override
  State<Screen06HomeDashboard> createState() => _Screen06HomeDashboardState();
}

class _Screen06HomeDashboardState extends State<Screen06HomeDashboard> {
  int _bottomNavIndex = 0;

  final List<Map<String, dynamic>> _categories = [
    {
      'title': 'Hospital Help',
      'rate': '₹2.50/m',
      'icon': Icons.local_hospital_rounded,
      'color': Color(0xFFEF4444),
      'id': 'hospital',
    },
    {
      'title': 'Queue Waiter',
      'rate': '₹2.00/m',
      'icon': Icons.people_alt_rounded,
      'color': Color(0xFFF59E0B),
      'id': 'queue',
    },
    {
      'title': 'Doc Pickup',
      'rate': '₹2.25/m',
      'icon': Icons.description_rounded,
      'color': Color(0xFF3B82F6),
      'id': 'docs',
    },
    {
      'title': 'Senior Care',
      'rate': '₹2.75/m',
      'icon': Icons.elderly_rounded,
      'color': Color(0xFF8B5CF6),
      'id': 'senior',
    },
    {
      'title': 'Temple Darshan',
      'rate': '₹2.00/m',
      'icon': Icons.temple_hindu_rounded,
      'color': Color(0xFFD97706),
      'id': 'temple',
    },
    {
      'title': 'Market Errand',
      'rate': '₹2.00/m',
      'icon': Icons.shopping_basket_rounded,
      'color': Color(0xFF10B981),
      'id': 'market',
    },
    {
      'title': 'Ticket Line',
      'rate': '₹2.25/m',
      'icon': Icons.confirmation_number_rounded,
      'color': Color(0xFF06B6D4),
      'id': 'ticket',
    },
    {
      'title': 'Quick Fetch',
      'rate': '₹2.50/m',
      'icon': Icons.inventory_2_rounded,
      'color': Color(0xFF6366F1),
      'id': 'fetch',
    },
    {
      'title': 'Event Stand-In',
      'rate': '₹2.00/m',
      'icon': Icons.event_seat_rounded,
      'color': Color(0xFFEC4899),
      'id': 'event',
    },
    {
      'title': 'Urgent Presence',
      'rate': '₹3.00/m',
      'icon': Icons.health_and_safety_rounded,
      'color': Color(0xFFDC2626),
      'id': 'urgent',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        titleSpacing: 16,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.location_on_rounded, size: 16, color: theme.colorScheme.primary),
                const SizedBox(width: 4),
                const Text(
                  'Hazratganj, Lucknow',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF0F172A),
                  ),
                ),
                const Icon(Icons.keyboard_arrow_down_rounded, size: 18),
              ],
            ),
            const Text(
              'Arriving at doorstep in 8-12 mins',
              style: TextStyle(fontSize: 11, color: Color(0xFF64748B)),
            ),
          ],
        ),
        actions: [
          ActionChip(
            avatar: const Icon(Icons.support_agent, size: 16, color: Color(0xFF0F766E)),
            label: const Text('Partner App', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF0F766E))),
            backgroundColor: const Color(0xFFE6FFFA),
            side: const BorderSide(color: Color(0xFF2DD4BF)),
            onPressed: () {
              Navigator.of(context).pushNamed('/partner-home');
            },
          ),
          const SizedBox(width: 4),
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            onPressed: () {
              Navigator.of(context).pushNamed('/notifications');
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Live Active Partner Counter Pill
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F766E).withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFF0F766E).withValues(alpha: 0.2)),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: Color(0xFF047857),
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text(
                      '42 Verified Field Partners Active in 3 km',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF0F766E),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Quick Task Prompt Card
              GestureDetector(
                onTap: () => Navigator.of(context).pushNamed('/write-task'),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.03),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Need someone right now?',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w800,
                                color: Color(0xFF0F172A),
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Type or speak any physical assistance task...',
                              style: TextStyle(fontSize: 13, color: Colors.grey.shade600),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F766E),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Icon(Icons.mic_rounded, color: Colors.white, size: 22),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // 10 Services Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    '10 Core Assistance Services',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(context).pushNamed('/services'),
                    child: const Text('View All'),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              // 10 Categories Grid
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _categories.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.15,
                ),
                itemBuilder: (context, index) {
                  final cat = _categories[index];
                  return InkWell(
                    onTap: () => Navigator.of(context).pushNamed('/write-task', arguments: cat),
                    borderRadius: BorderRadius.circular(16),
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: (cat['color'] as Color).withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Icon(cat['icon'] as IconData, color: cat['color'] as Color, size: 22),
                          ),
                          const Spacer(),
                          Text(
                            cat['title'] as String,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                              color: Color(0xFF0F172A),
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'From ${cat['rate']} • 30m min',
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF047857),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _bottomNavIndex,
        onDestinationSelected: (idx) {
          if (idx == 0) {
            setState(() => _bottomNavIndex = 0);
          } else if (idx == 1) {
            Navigator.of(context).pushNamed('/orders');
          } else if (idx == 2) {
            Navigator.of(context).pushNamed('/sos');
          } else if (idx == 3) {
            Navigator.of(context).pushNamed('/profile');
          }
        },
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_rounded), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.receipt_long_rounded), label: 'Orders'),
          NavigationDestination(icon: Icon(Icons.shield_rounded), label: 'Safety'),
          NavigationDestination(icon: Icon(Icons.person_rounded), label: 'Profile'),
        ],
      ),
    );
  }
}
