import 'package:flutter/material.dart';

// File: lib/screens/screen_08_service_selection.dart
/// Screen 8 — Service Selection: The 10 permitted human assistance services with transparent per-minute rates and 30-minute minimums
class Screen08ServiceSelection extends StatefulWidget {
  const Screen08ServiceSelection({super.key});

  @override
  State<Screen08ServiceSelection> createState() => _Screen08ServiceSelectionState();
}

class _Screen08ServiceSelectionState extends State<Screen08ServiceSelection> {
  String _selectedServiceId = 'queue-waiter';

  final List<Map<String, dynamic>> _catalog = [
    {
      'id': 'hospital-assistance',
      'name': 'Hospital Assistance',
      'rate': 2.50,
      'desc': 'Patient navigation, wheelchair assistance, medicine counter lines.',
      'icon': Icons.local_hospital_rounded,
    },
    {
      'id': 'queue-waiter',
      'name': 'Govt Office & Queue Waiting',
      'rate': 2.00,
      'desc': 'Physical spot retention at RTO, Post Office, Registry, and Municipal counters.',
      'icon': Icons.people_alt_rounded,
    },
    {
      'id': 'document-pickup',
      'name': 'Document Pickup & Run',
      'rate': 2.25,
      'desc': 'Urgent physical courier, stamp paper fetching, notary submissions.',
      'icon': Icons.description_rounded,
    },
    {
      'id': 'senior-companion',
      'name': 'Senior Citizen Companion',
      'rate': 2.75,
      'desc': 'Accompaniment for bank visits, park strolls, and health checkups.',
      'icon': Icons.elderly_rounded,
    },
    {
      'id': 'temple-darshan',
      'name': 'Temple / Darshan Line Assistance',
      'rate': 2.00,
      'desc': 'Prasad fetching, queue line holding, and elderly shoe stand assistance.',
      'icon': Icons.temple_hindu_rounded,
    },
    {
      'id': 'local-errand',
      'name': 'Local Market Errand',
      'rate': 2.00,
      'desc': 'Kirana store pickup, tailoring drop, or neighborhood delivery.',
      'icon': Icons.shopping_basket_rounded,
    },
    {
      'id': 'ticket-counter',
      'name': 'Ticket Counter Standing',
      'rate': 2.25,
      'desc': 'Rail booking counters, bus depot queues, match and concert lines.',
      'icon': Icons.confirmation_number_rounded,
    },
    {
      'id': 'lost-found-delivery',
      'name': 'Lost & Found / Quick Fetch',
      'rate': 2.50,
      'desc': 'Forgot keys or chargers? Assistant retrieves and brings them immediately.',
      'icon': Icons.inventory_2_rounded,
    },
    {
      'id': 'event-line-holder',
      'name': 'Event & Entry Line Holder',
      'rate': 2.00,
      'desc': 'Spot holding at product launches, auditoriums, and exhibitions.',
      'icon': Icons.event_seat_rounded,
    },
    {
      'id': 'emergency-presence',
      'name': 'Emergency Physical Presence',
      'rate': 3.00,
      'desc': 'Immediate on-site companion during vehicle breakdown or emergency wait.',
      'icon': Icons.health_and_safety_rounded,
    },
  ];

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?) ?? {};
    final taskDesc = (args['task_description'] as String?) ?? 'Queue line holding';
    final estimatedMins = (args['estimated_mins'] as int?) ?? 45;

    final selected = _catalog.firstWhere((s) => s['id'] == _selectedServiceId);
    final minBill = (selected['rate'] as double) * 30;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Select Permitted Service'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Transparency Banner
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFF0F766E).withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFF0F766E).withValues(alpha: 0.2)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.verified_user_rounded, color: Color(0xFF0F766E), size: 20),
                  SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'All 10 services carry an authoritative 30-minute minimum billing floor. Zero surge pricing.',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF0F172A)),
                    ),
                  ),
                ],
              ),
            ),

            // Service List
            Expanded(
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _catalog.length,
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  final service = _catalog[index];
                  final isSelected = service['id'] == _selectedServiceId;

                  return InkWell(
                    onTap: () => setState(() => _selectedServiceId = service['id'] as String),
                    borderRadius: BorderRadius.circular(16),
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: isSelected ? const Color(0xFF0F766E) : const Color(0xFFE2E8F0),
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0xFF0F766E)
                                  : const Color(0xFF0F766E).withValues(alpha: 0.08),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Icon(
                              service['icon'] as IconData,
                              color: isSelected ? Colors.white : const Color(0xFF0F766E),
                              size: 22,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  service['name'] as String,
                                  style: const TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                    color: Color(0xFF0F172A),
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  service['desc'] as String,
                                  style: const TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 8),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                '₹${(service['rate'] as double).toStringAsFixed(2)}',
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w800,
                                  color: Color(0xFF047857),
                                ),
                              ),
                              const Text('/ minute', style: TextStyle(fontSize: 10, color: Colors.grey)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),

            // Bottom Confirmation Bar
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: Colors.white,
                boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, -3))],
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Minimum Commitment',
                          style: TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                        ),
                        Text(
                          '₹${minBill.toStringAsFixed(2)} (30 mins)',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                      ],
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      // Navigate to Location Picker / Task Details
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Selected: ${selected['name']}')),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(180, 48),
                    ),
                    child: const Text('Proceed to Details'),
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
