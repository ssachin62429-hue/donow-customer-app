import 'package:flutter/material.dart';

// File: lib/screens/screen_19_orders_tab.dart
/// Screen 19 — Orders Tab: Filterable order cards categorized across Upcoming, Active, Completed, and Cancelled
class Screen19OrdersTab extends StatefulWidget {
  const Screen19OrdersTab({super.key});

  @override
  State<Screen19OrdersTab> createState() => _Screen19OrdersTabState();
}

class _Screen19OrdersTabState extends State<Screen19OrdersTab>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  final List<Map<String, dynamic>> _allOrders = [
    {
      'id': 'DN-89210',
      'service': 'Queue Waiter (GPO Hazratganj)',
      'status': 'Completed',
      'date': '22 Sep 2026, 11:30 AM',
      'partner': 'Rahul Sharma',
      'amount': '₹340.00',
      'duration': '150 mins',
    },
    {
      'id': 'DN-88192',
      'service': 'Hospital Navigation Assistance',
      'status': 'Completed',
      'date': '18 Sep 2026, 09:15 AM',
      'partner': 'Vikas Singh',
      'amount': '₹225.00',
      'duration': '90 mins',
    },
    {
      'id': 'DN-90412',
      'service': 'Urgent Document Courier',
      'status': 'Active',
      'date': 'Today, 04:30 PM',
      'partner': 'Anand Verma',
      'amount': 'In Progress',
      'duration': '35 mins elapsed',
    },
    {
      'id': 'DN-76510',
      'service': 'Temple Line Holding (Hanuman Setu)',
      'status': 'Cancelled',
      'date': '12 Sep 2026, 06:00 AM',
      'partner': 'Unassigned',
      'amount': '₹0.00',
      'duration': 'Cancelled within 1 min',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> _filterOrders(String status) {
    if (status == 'All') return _allOrders;
    return _allOrders.where((o) => o['status'] == status).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('My Tasks & Orders'),
        bottom: TabBar(
          controller: _tabController,
          labelColor: const Color(0xFF0F766E),
          indicatorColor: const Color(0xFF0F766E),
          unselectedLabelColor: const Color(0xFF64748B),
          isScrollable: true,
          tabs: const [
            Tab(text: 'Active'),
            Tab(text: 'Completed'),
            Tab(text: 'Upcoming'),
            Tab(text: 'Cancelled'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildOrderList('Active'),
          _buildOrderList('Completed'),
          _buildOrderList('Upcoming'),
          _buildOrderList('Cancelled'),
        ],
      ),
    );
  }

  Widget _buildOrderList(String status) {
    final filtered = _filterOrders(status);

    if (filtered.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.inbox_rounded, size: 54, color: Colors.grey.shade300),
            const SizedBox(height: 12),
            Text(
              'No $status orders found',
              style: const TextStyle(fontSize: 14, color: Color(0xFF64748B), fontWeight: FontWeight.w600),
            ),
          ],
        ),
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: filtered.length,
      separatorBuilder: (_, __) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final order = filtered[index];
        final isCompleted = order['status'] == 'Completed';

        return InkWell(
          onTap: () {
            Navigator.of(context).pushNamed(
              '/order-details',
              arguments: order,
            );
          },
          borderRadius: BorderRadius.circular(16),
          child: Container(
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
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Order #${order['id']}',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF64748B)),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: isCompleted
                            ? const Color(0xFF047857).withValues(alpha: 0.1)
                            : const Color(0xFF0F766E).withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        order['status'] as String,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: isCompleted ? const Color(0xFF047857) : const Color(0xFF0F766E),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  order['service'] as String,
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                ),
                const SizedBox(height: 4),
                Text(
                  '${order['date']} • ${order['duration']}',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                ),
                const SizedBox(height: 12),
                const Divider(height: 1, color: Color(0xFFF1F5F9)),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Partner: ${order['partner']}',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF475569)),
                    ),
                    Text(
                      order['amount'] as String,
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Color(0xFF047857)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
