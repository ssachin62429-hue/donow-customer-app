import 'package:flutter/material.dart';

// File: lib/screens/screen_24_support_faq.dart
/// Screen 24 — Support & FAQs: Accordion FAQs covering billing calculations, phone masking, early arrival timer rules, and tips, with built-in Terms
class Screen24SupportFaq extends StatelessWidget {
  const Screen24SupportFaq({super.key});

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
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Support & Help Center'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
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
                            'Need immediate help?',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Our support desk is available 24x7 in Lucknow.',
                            style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.chat_bubble_outline_rounded, color: Color(0xFF0F766E)),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Starting Live Chat with DoNow Support Agent...')),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              const Text(
                'Frequently Asked Questions',
                style: TextStyle(
                  fontSize: 18,
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
              const SizedBox(height: 24),

              // Legal Policy Links
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Legal & Operational Policies',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 10),
                    _buildPolicyItem(context, 'Terms & Conditions (Hyper-local Marketplace)'),
                    const Divider(height: 16, color: Color(0xFFF1F5F9)),
                    _buildPolicyItem(context, 'Privacy Policy & Data Security'),
                    const Divider(height: 16, color: Color(0xFFF1F5F9)),
                    _buildPolicyItem(context, 'Zero Tolerance Safety & Harassment Policy'),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPolicyItem(BuildContext context, String title) {
    return InkWell(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Opening $title...')),
        );
      },
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF334155))),
          const Icon(Icons.arrow_forward_ios_rounded, size: 12, color: Color(0xFF94A3B8)),
        ],
      ),
    );
  }
}
