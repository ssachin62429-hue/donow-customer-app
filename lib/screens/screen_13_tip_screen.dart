import 'package:flutter/material.dart';

// File: lib/screens/screen_13_tip_screen.dart
/// Screen 13 — Tip Screen: Quick tip selection (₹10, ₹20, ₹40, ₹100, or No Tip) with 100% partner pass-through guarantee
class Screen13TipScreen extends StatefulWidget {
  const Screen13TipScreen({super.key});

  @override
  State<Screen13TipScreen> createState() => _Screen13TipScreenState();
}

class _Screen13TipScreenState extends State<Screen13TipScreen> {
  int _selectedTip = 20;
  final List<int> _tipOptions = [0, 10, 20, 40, 100];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Add Priority Tip'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFF59E0B).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFF59E0B).withValues(alpha: 0.3)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.volunteer_activism_rounded, color: Color(0xFFD97706), size: 28),
                    SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '100% Direct Pass-Through',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w800,
                              color: Color(0xFF0F172A),
                            ),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'DoNow takes 0% commission on tips. It is paid straight to the assistant upon task completion.',
                            style: TextStyle(fontSize: 12, color: Color(0xFF64748B), height: 1.3),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 28),

              const Text(
                'Select Tip Amount',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Partners prioritize tasks with a tip during heavy rain or peak hours.',
                style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 24),

              // Tip Options Grid
              Wrap(
                spacing: 12,
                runSpacing: 12,
                children: _tipOptions.map((tip) {
                  final isSelected = _selectedTip == tip;
                  return InkWell(
                    onTap: () => setState(() => _selectedTip = tip),
                    borderRadius: BorderRadius.circular(14),
                    child: Container(
                      width: 90,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(
                        color: isSelected ? const Color(0xFF0F766E) : Colors.white,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(
                          color: isSelected ? const Color(0xFF0F766E) : const Color(0xFFE2E8F0),
                          width: isSelected ? 2 : 1,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.03),
                            blurRadius: 6,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Center(
                        child: Text(
                          tip == 0 ? 'No Tip' : '₹$tip',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w800,
                            color: isSelected ? Colors.white : const Color(0xFF0F172A),
                          ),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),

              const Spacer(),

              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pop(_selectedTip);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        _selectedTip > 0
                            ? 'Tip of ₹$_selectedTip added! Broadcast priority upgraded.'
                            : 'No tip selected.',
                      ),
                    ),
                  );
                },
                child: Text(_selectedTip > 0 ? 'Confirm Tip (₹$_selectedTip)' : 'Continue Without Tip'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
