import 'package:flutter/material.dart';

// File: lib/screens/screen_18_rate_partner.dart
/// Screen 18 — Rate Partner: Interactive 5-star rating control, punctuality/courtesy tags, and written review box
class Screen18RatePartner extends StatefulWidget {
  const Screen18RatePartner({super.key});

  @override
  State<Screen18RatePartner> createState() => _Screen18RatePartnerState();
}

class _Screen18RatePartnerState extends State<Screen18RatePartner> {
  int _selectedStars = 5;
  final TextEditingController _reviewController = TextEditingController();

  final List<String> _tags = [
    'Strict Punctuality',
    'Polite & Courteous',
    'Followed Instructions',
    'Kept Updated',
    'Queue Held Perfectly',
  ];
  final Set<String> _selectedTags = {'Strict Punctuality', 'Followed Instructions'};

  @override
  void dispose() {
    _reviewController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Rate Assistant'),
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            children: [
              const CircleAvatar(
                radius: 36,
                backgroundColor: Color(0xFFE0F2FE),
                child: Icon(Icons.person_rounded, size: 48, color: Color(0xFF0F766E)),
              ),
              const SizedBox(height: 14),
              const Text(
                'How was Rahul Sharma?',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Your rating helps maintain community trust and high partner standards.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 24),

              // 5-Star Interactive Rating Bar
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(5, (index) {
                  final starVal = index + 1;
                  return IconButton(
                    iconSize: 42,
                    padding: const EdgeInsets.symmetric(horizontal: 4),
                    icon: Icon(
                      starVal <= _selectedStars ? Icons.star_rounded : Icons.star_outline_rounded,
                      color: const Color(0xFFF59E0B),
                    ),
                    onPressed: () => setState(() => _selectedStars = starVal),
                  );
                }),
              ),
              const SizedBox(height: 20),

              // Feedback Tags
              Wrap(
                spacing: 8,
                runSpacing: 8,
                alignment: WrapAlignment.center,
                children: _tags.map((tag) {
                  final isSelected = _selectedTags.contains(tag);
                  return FilterChip(
                    label: Text(tag),
                    selected: isSelected,
                    selectedColor: const Color(0xFF0F766E).withValues(alpha: 0.15),
                    checkmarkColor: const Color(0xFF0F766E),
                    labelStyle: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: isSelected ? const Color(0xFF0F766E) : const Color(0xFF475569),
                    ),
                    onSelected: (selected) {
                      setState(() {
                        if (selected) {
                          _selectedTags.add(tag);
                        } else {
                          _selectedTags.remove(tag);
                        }
                      });
                    },
                  );
                }).toList(),
              ),
              const SizedBox(height: 24),

              // Review Text Area
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: TextField(
                  controller: _reviewController,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    hintText: 'Share more details about your experience (optional)...',
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.all(16),
                  ),
                ),
              ),
              const SizedBox(height: 32),

              ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Thank you! Your feedback has been recorded.')),
                  );
                  Navigator.of(context).pushNamedAndRemoveUntil('/home', (route) => false);
                },
                child: const Text('Submit Rating & Return Home'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
