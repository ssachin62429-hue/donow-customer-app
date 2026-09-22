import 'package:flutter/material.dart';

// File: lib/screens/screen_09_task_details.dart
/// Screen 9 — Task Details: Configurable checklist options, special instructions box, and schedule controls
class Screen09TaskDetails extends StatefulWidget {
  const Screen09TaskDetails({super.key});

  @override
  State<Screen09TaskDetails> createState() => _Screen09TaskDetailsState();
}

class _Screen09TaskDetailsState extends State<Screen09TaskDetails> {
  final TextEditingController _instructionsController = TextEditingController();
  final List<Map<String, dynamic>> _checklistItems = [
    {'title': 'Keep customer updated via in-app chat every 15 mins', 'checked': true},
    {'title': 'Verify token/counter number with receipt photo', 'checked': true},
    {'title': 'Do not make any personal cash payouts on behalf of customer', 'checked': true},
    {'title': 'Call customer immediately when spot is within 2 spots of turn', 'checked': false},
  ];

  bool _isUrgent = false;

  @override
  void dispose() {
    _instructionsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?) ?? {};
    final serviceName = (args['service_name'] as String?) ?? 'Govt Office & Queue Waiting';
    final ratePerMin = (args['rate'] as double?) ?? 2.00;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Task Specifications'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Service Header Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F766E).withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFF0F766E).withValues(alpha: 0.2)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.handyman_rounded, color: Color(0xFF0F766E), size: 20),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        '$serviceName (₹${ratePerMin.toStringAsFixed(2)}/min)',
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF0F766E),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Checklist Section
              const Text(
                'Task Checklist & Guardrails',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Partner must strictly follow these instructions during task execution:',
                style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 12),

              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  children: List.generate(_checklistItems.length, (index) {
                    final item = _checklistItems[index];
                    return CheckboxListTile(
                      value: item['checked'] as bool,
                      activeColor: const Color(0xFF0F766E),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12),
                      title: Text(
                        item['title'] as String,
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: item['checked'] ? const Color(0xFF0F172A) : const Color(0xFF64748B),
                        ),
                      ),
                      onChanged: (val) {
                        setState(() => item['checked'] = val ?? false);
                      },
                    );
                  }),
                ),
              ),
              const SizedBox(height: 20),

              // Special Instructions Text Area
              const Text(
                'Special Instructions (Optional)',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 8),
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: TextField(
                  controller: _instructionsController,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    hintText:
                        'e.g. Please wear a mask. Ask for counter 4 token series "B". I have blue folder.',
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.all(14),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Urgent Switch
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.flash_on_rounded, color: Color(0xFFD97706)),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'High Priority Dispatch',
                            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Color(0xFF0F172A)),
                          ),
                          Text(
                            'Alerts partners with high priority audio notification',
                            style: TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                          ),
                        ],
                      ),
                    ),
                    Switch(
                      value: _isUrgent,
                      activeColor: const Color(0xFF0F766E),
                      onChanged: (val) => setState(() => _isUrgent = val),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushNamed(
                    '/location',
                    arguments: {
                      ...args,
                      'special_instructions': _instructionsController.text.trim(),
                      'is_urgent': _isUrgent,
                    },
                  );
                },
                child: const Text('Set Meeting Location & Landmark'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
