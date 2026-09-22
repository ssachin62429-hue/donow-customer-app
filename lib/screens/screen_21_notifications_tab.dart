import 'package:flutter/material.dart';

// File: lib/screens/screen_21_notifications_tab.dart
/// Screen 21 — Notifications Tab: Real-time order updates, partner arrival pings, and completion receipts with unread indicators
class Screen21NotificationsTab extends StatefulWidget {
  const Screen21NotificationsTab({super.key});

  @override
  State<Screen21NotificationsTab> createState() => _Screen21NotificationsTabState();
}

class _Screen21NotificationsTabState extends State<Screen21NotificationsTab> {
  final List<Map<String, dynamic>> _notifications = [
    {
      'title': 'Partner Rahul Arrived (50m)',
      'desc': 'Rahul Sharma is at your doorstep. Share PIN 4819 to begin service.',
      'time': 'Just now',
      'unread': true,
      'icon': Icons.location_on_rounded,
      'color': Color(0xFF0F766E),
    },
    {
      'title': 'Task Completed & Settled',
      'desc': 'Order #DN-89210 of ₹340.00 marked paid via UPI.',
      'time': '2 hours ago',
      'unread': true,
      'icon': Icons.receipt_rounded,
      'color': Color(0xFF047857),
    },
    {
      'title': 'Partner Assigned: Rahul Sharma',
      'desc': 'Rahul accepted your queue request and is en route (ETA 8 mins).',
      'time': '4 hours ago',
      'unread': false,
      'icon': Icons.person_pin_rounded,
      'color': Color(0xFF3B82F6),
    },
    {
      'title': 'Emergency SOS Test Notification',
      'desc': 'DoNow 24x7 Safety hotline verified for Lucknow Central zone.',
      'time': 'Yesterday',
      'unread': false,
      'icon': Icons.shield_rounded,
      'color': Color(0xFFDC2626),
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Notifications'),
        actions: [
          TextButton(
            onPressed: () {
              setState(() {
                for (var n in _notifications) {
                  n['unread'] = false;
                }
              });
            },
            child: const Text('Mark all read'),
          ),
        ],
      ),
      body: SafeArea(
        child: ListView.separated(
          padding: const EdgeInsets.all(16),
          itemCount: _notifications.length,
          separatorBuilder: (_, __) => const SizedBox(height: 10),
          itemBuilder: (context, index) {
            final n = _notifications[index];
            final isUnread = n['unread'] as bool;

            return Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isUnread ? Colors.white : const Color(0xFFF8FAFC),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: isUnread ? const Color(0xFF0F766E).withValues(alpha: 0.3) : const Color(0xFFE2E8F0),
                ),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: (n['color'] as Color).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(n['icon'] as IconData, color: n['color'] as Color, size: 22),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              n['title'] as String,
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: isUnread ? FontWeight.w800 : FontWeight.w600,
                                color: const Color(0xFF0F172A),
                              ),
                            ),
                            if (isUnread)
                              Container(
                                width: 8,
                                height: 8,
                                decoration: const BoxDecoration(
                                  color: Color(0xFF0F766E),
                                  shape: BoxShape.circle,
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          n['desc'] as String,
                          style: const TextStyle(fontSize: 12, color: Color(0xFF64748B), height: 1.3),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          n['time'] as String,
                          style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
