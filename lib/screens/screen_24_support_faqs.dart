import 'package:flutter/material.dart';

// File: lib/screens/screen_24_support_faqs.dart
/// Screen 24 — Support & FAQs: Accordion FAQs covering billing calculations, phone masking, early arrival timer rules, and tips, with built-in Terms of Service and Privacy Policy tabs
class Screen24SupportFaqs extends StatefulWidget {
  const Screen24SupportFaqs({super.key});

  @override
  State<Screen24SupportFaqs> createState() => _Screen24SupportFaqsState();
}

class _Screen24SupportFaqsState extends State<Screen24SupportFaqs>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  final List<Map<String, String>> _faqs = const [
    {
      'q': 'How is my bill calculated?',
      'a': 'DoNow bills strictly by the minute based on the transparent base rate (e.g. ₹2.00/min). A mandatory 30-minute minimum floor applies to protect partner travel time. Once 30 minutes pass, every single minute is billed accurately without hidden fees.',
    },
    {
      'q': 'How does the 30-minute minimum floor work?',
      'a': 'Even if your queue waiting or micro-task concludes in 10 or 15 minutes, the partner receives compensation for the 30-minute minimum floor (e.g., ₹60 at ₹2/min). If the task takes 45 minutes, you pay for 45 minutes.',
    },
    {
      'q': 'How does Direct Cash/UPI payment work?',
      'a': 'DoNow operates on a direct Peer-to-Peer settlement model. When the partner clicks "Work Completed", an itemized receipt is generated. You pay the partner directly in Cash or via any UPI app (GPay, PhonePe, Paytm). DoNow does not hold platform escrow.',
    },
    {
      'q': 'Is my phone number private?',
      'a': 'Yes! DoNow uses virtual VoIP masking. Neither you nor the partner see each other\'s real mobile numbers. All in-app calls and chats are encrypted and anonymized.',
    },
    {
      'q': 'What is the 50-metre Early Arrival Safeguard?',
      'a': 'If a partner arrives earlier than requested or before you are ready, the billing timer CANNOT start. The timer only starts when the partner enters your doorstep 4-digit PIN inside the 50m geofence.',
    },
    {
      'q': 'Who receives the tip amount?',
      'a': '100% of any tip you add goes straight to the assistant. DoNow charges 0% commission on tips.',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Help & Policies'),
        bottom: TabBar(
          controller: _tabController,
          labelColor: const Color(0xFF0F766E),
          indicatorColor: const Color(0xFF0F766E),
          unselectedLabelColor: const Color(0xFF64748B),
          tabs: const [
            Tab(text: 'FAQs'),
            Tab(text: 'Terms of Service'),
            Tab(text: 'Privacy Policy'),
          ],
        ),
      ),
      body: SafeArea(
        child: TabBarView(
          controller: _tabController,
          children: [
            _buildFaqTab(),
            _buildTermsTab(),
            _buildPrivacyTab(),
          ],
        ),
      ),
    );
  }

  Widget _buildFaqTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Contact Support Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F766E).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Icon(Icons.headset_mic_rounded, color: Color(0xFF0F766E), size: 28),
                ),
                const SizedBox(width: 14),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '24x7 Customer Support',
                        style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Operating live across Lucknow districts.',
                        style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.chat_bubble_outline_rounded, color: Color(0xFF0F766E)),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Starting Live Support Chat...')),
                    );
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          const Text(
            'Frequently Asked Questions',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w800,
              color: Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),

          // FAQ Accordions
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(18),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _faqs.length,
                separatorBuilder: (_, __) => const Divider(height: 1, color: Color(0xFFF1F5F9)),
                itemBuilder: (context, index) {
                  final item = _faqs[index];
                  return ExpansionTile(
                    title: Text(
                      item['q']!,
                      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Color(0xFF0F172A)),
                    ),
                    childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                    children: [
                      Text(
                        item['a']!,
                        style: const TextStyle(fontSize: 13, color: Color(0xFF475569), height: 1.45),
                      ),
                    ],
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTermsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Terms of Service',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
            ),
            SizedBox(height: 12),
            Text(
              '1. Direct Marketplace Intermediary\n'
              'DoNow acts solely as a technology intermediary connecting customers with independent local assistants in Lucknow. DoNow does not employ assistants directly.\n\n'
              '2. Direct P2P Payment Model\n'
              'All payments for micro-services and queue assistance are settled directly between Customer and Assistant via physical Cash or direct UPI. DoNow holds no consumer escrow balances.\n\n'
              '3. 30-Minute Minimum Floor\n'
              'Every requested service is subject to a strict 30-minute minimum billing floor to cover travel and opportunity costs of the partner.\n\n'
              '4. Prohibited Tasks & Zero Tolerance\n'
              'Partners are prohibited from carrying illegal contraband, executing hazardous electrical or plumbing work, standing in for official sworn legal signatures, or handling large sums of unverified cash.',
              style: TextStyle(fontSize: 13, color: Color(0xFF334155), height: 1.55),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPrivacyTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Privacy & Data Policy',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
            ),
            SizedBox(height: 12),
            Text(
              '1. Virtual Phone Masking\n'
              'To safeguard your privacy, real phone numbers are NEVER disclosed to assistants or third parties. Calls and messages are routed through encrypted virtual proxies.\n\n'
              '2. Geolocation Privacy\n'
              'GPS location tracking is active solely while an order is in progress for verification and safety auditing. Once the order concludes, location tracking is terminated.\n\n'
              '3. Aadhaar and Identity Storage\n'
              'All customer and partner verification records are encrypted under AES-256 standards in full compliance with Indian Information Technology regulations.',
              style: TextStyle(fontSize: 13, color: Color(0xFF334155), height: 1.55),
            ),
          ],
        ),
      ),
    );
  }
}
