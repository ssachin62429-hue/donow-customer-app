import 'package:flutter/material.dart';

/// Service Model for DoNow Master Catalog
class DoNowService {
  final String id;
  final String nameEn;
  final String nameHi;
  final String category;
  final double baseRatePerMin;
  final int minDurationMins;
  final IconData icon;

  const DoNowService({
    required this.id,
    required this.nameEn,
    required this.nameHi,
    required this.category,
    required this.baseRatePerMin,
    required this.minDurationMins,
    required this.icon,
  });
}

/// The 10 Core Verticals from DoNow Master Specification
const List<DoNowService> kCoreServices = [
  DoNowService(
    id: 'hospital-assistance',
    nameEn: 'Hospital Assistance',
    nameHi: 'अस्पताल सहायता',
    category: 'Medical',
    baseRatePerMin: 2.50,
    minDurationMins: 30,
    icon: Icons.local_hospital_rounded,
  ),
  DoNowService(
    id: 'queue-waiter',
    nameEn: 'Govt Office & Queue Waiting',
    nameHi: 'लाइन में खड़ा होना',
    category: 'Errands',
    baseRatePerMin: 2.00,
    minDurationMins: 30,
    icon: Icons.people_alt_rounded,
  ),
  DoNowService(
    id: 'document-pickup',
    nameEn: 'Document Pickup & Run',
    nameHi: 'दस्तावेज़ पिकअप',
    category: 'Logistics',
    baseRatePerMin: 2.25,
    minDurationMins: 30,
    icon: Icons.description_rounded,
  ),
  DoNowService(
    id: 'senior-companion',
    nameEn: 'Senior Citizen Companion',
    nameHi: 'वरिष्ठ नागरिक साथी',
    category: 'Care',
    baseRatePerMin: 2.75,
    minDurationMins: 30,
    icon: Icons.elderly_rounded,
  ),
  DoNowService(
    id: 'temple-darshan',
    nameEn: 'Temple / Darshan Assistance',
    nameHi: 'मंदिर / दर्शन सहायता',
    category: 'Devotion',
    baseRatePerMin: 2.00,
    minDurationMins: 30,
    icon: Icons.temple_hindu_rounded,
  ),
  DoNowService(
    id: 'local-errand',
    nameEn: 'Local Market Errand',
    nameHi: 'बाज़ार के छोटे काम',
    category: 'Errands',
    baseRatePerMin: 2.00,
    minDurationMins: 30,
    icon: Icons.shopping_basket_rounded,
  ),
  DoNowService(
    id: 'ticket-counter',
    nameEn: 'Ticket Counter Standing',
    nameHi: 'टिकट काउंटर लाइन',
    category: 'Logistics',
    baseRatePerMin: 2.25,
    minDurationMins: 30,
    icon: Icons.confirmation_number_rounded,
  ),
  DoNowService(
    id: 'lost-found-delivery',
    nameEn: 'Lost & Found / Quick Fetch',
    nameHi: 'सामान लाना व पहुँचाना',
    category: 'Logistics',
    baseRatePerMin: 2.50,
    minDurationMins: 30,
    icon: Icons.inventory_2_rounded,
  ),
  DoNowService(
    id: 'event-line-holder',
    nameEn: 'Event & Entry Line Holder',
    nameHi: 'इवेंट एंट्री लाइन होल्डर',
    category: 'Errands',
    baseRatePerMin: 2.00,
    minDurationMins: 30,
    icon: Icons.event_seat_rounded,
  ),
  DoNowService(
    id: 'emergency-presence',
    nameEn: 'Emergency Physical Presence',
    nameHi: 'आपातकालीन उपस्थिति',
    category: 'Safety',
    baseRatePerMin: 3.00,
    minDurationMins: 30,
    icon: Icons.health_and_safety_rounded,
  ),
];

/// Screen 04: Home Dashboard & Catalog
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isHindi = false;
  String _selectedCategory = 'All';

  final List<String> _categories = [
    'All',
    'Medical',
    'Errands',
    'Logistics',
    'Care',
    'Safety',
  ];

  @override
  Widget build(BuildContext context) {
    final filteredServices = _selectedCategory == 'All'
        ? kCoreServices
        : kCoreServices.where((s) => s.category == _selectedCategory).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        titleSpacing: 16,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.location_on_rounded,
                    size: 16, color: Theme.of(context).colorScheme.primary),
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
              'Delivering in 10-15 mins',
              style: TextStyle(
                fontSize: 11,
                color: Color(0xFF64748B),
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
        actions: [
          // Language Switcher Pill
          GestureDetector(
            onTap: () => setState(() => _isHindi = !_isHindi),
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFFE2E8F0),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                children: [
                  Text(
                    _isHindi ? 'हिंदी' : 'EN',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(width: 4),
                  const Icon(Icons.translate_rounded, size: 14),
                ],
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Active Task Alert Banner (Optional / Re-entry)
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFF0F766E).withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: const Color(0xFF0F766E).withValues(alpha: 0.25),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    decoration: BoxDecoration(
                      color: const Color(0xFF0F766E),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.bolt_rounded,
                        color: Colors.white, size: 22),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _isHindi
                            ? 'सहायक मात्र 30 मिनट की न्यूनतम दर पर'
                            : 'Assistants at ₹2.00 - ₹3.00 / min',
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                        Text(
                          _isHindi
                            ? 'कोई एस्क्रो नहीं • सीधे नकद या यूपीआई द्वारा भुगतान'
                            : '30-min minimum floor • Direct Cash / UPI to assistant',
                          style: const TextStyle(
                            fontSize: 11,
                            color: Color(0xFF64748B),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Category Filter Pills
            SizedBox(
              height: 44,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                scrollDirection: Axis.horizontal,
                itemCount: _categories.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final cat = _categories[index];
                  final isSelected = cat == _selectedCategory;
                  return ChoiceChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (val) {
                      if (val) setState(() => _selectedCategory = cat);
                    },
                    selectedColor: const Color(0xFF0F766E),
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : const Color(0xFF334155),
                      fontWeight: FontWeight.w600,
                      fontSize: 13,
                    ),
                    backgroundColor: Colors.white,
                    side: BorderSide(
                      color: isSelected
                          ? const Color(0xFF0F766E)
                          : const Color(0xFFE2E8F0),
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(18),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 10),

            // 10 Core Services Grid
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.all(16),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 14,
                  mainAxisSpacing: 14,
                  childAspectRatio: 0.96,
                ),
                itemCount: filteredServices.length,
                itemBuilder: (context, index) {
                  final service = filteredServices[index];
                  return InkWell(
                    onTap: () {
                      Navigator.of(context).pushNamed(
                        '/location-picker',
                        arguments: service,
                      );
                    },
                    borderRadius: BorderRadius.circular(18),
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.02),
                            blurRadius: 10,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Service Icon
                          Container(
                            width: 44,
                            height: 44,
                            decoration: BoxDecoration(
                              color: const Color(0xFF0F766E).withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Icon(
                              service.icon,
                              color: const Color(0xFF0F766E),
                              size: 24,
                            ),
                          ),
                          const Spacer(),

                          // Service Title
                          Text(
                            _isHindi ? service.nameHi : service.nameEn,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                              color: Color(0xFF0F172A),
                              height: 1.25,
                            ),
                          ),
                          const SizedBox(height: 6),

                          // Tariff Pill
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                '₹${service.baseRatePerMin.toStringAsFixed(2)}/m',
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w800,
                                  color: Color(0xFF047857),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 6,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF1F5F9),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  'Min ${service.minDurationMins}m',
                                  style: const TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w600,
                                    color: Color(0xFF64748B),
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
              ),
            ),
          ],
        ),
      ),
    );
  }
}
