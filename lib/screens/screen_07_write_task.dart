import 'package:flutter/material.dart';

// File: lib/screens/screen_07_write_task.dart
/// Screen 7 — Write Your Task: Custom task input, simulated voice dictation button, date, time, and duration selector
class Screen07WriteTask extends StatefulWidget {
  const Screen07WriteTask({super.key});

  @override
  State<Screen07WriteTask> createState() => _Screen07WriteTaskState();
}

class _Screen07WriteTaskState extends State<Screen07WriteTask> {
  final TextEditingController _taskController = TextEditingController();
  bool _isListening = false;
  int _estimatedMinutes = 45;
  DateTime _selectedDate = DateTime.now();
  TimeOfDay _selectedTime = TimeOfDay.now();

  @override
  void dispose() {
    _taskController.dispose();
    super.dispose();
  }

  void _toggleDictation() {
    setState(() => _isListening = !_isListening);
    if (_isListening) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Listening... Speak your task requirements clearly.')),
      );
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted && _isListening) {
          setState(() {
            _isListening = false;
            _taskController.text =
                'Stand in OPD registration line at KGMU Trauma Center and keep spot ready for patient.';
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Describe Your Task'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'What assistance do you need?',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Explain the physical steps required. Partner will follow these instructions directly.',
                style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 18),

              // Task Text Area with Mic Action
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: _isListening ? const Color(0xFF0F766E) : const Color(0xFFE2E8F0),
                    width: _isListening ? 2 : 1,
                  ),
                ),
                child: Column(
                  children: [
                    TextField(
                      controller: _taskController,
                      maxLines: 5,
                      style: const TextStyle(fontSize: 15, color: Color(0xFF0F172A)),
                      decoration: const InputDecoration(
                        hintText:
                            'e.g. Please hold my spot in queue at Hazratganj Post Office counter #3. I will arrive in 20 minutes.',
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.all(16),
                      ),
                      onChanged: (_) => setState(() {}),
                    ),
                    Divider(height: 1, color: Colors.grey.shade200),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      child: Row(
                        children: [
                          IconButton.filledTonal(
                            icon: Icon(
                              _isListening ? Icons.stop_rounded : Icons.mic_rounded,
                              color: _isListening ? Colors.red : const Color(0xFF0F766E),
                            ),
                            onPressed: _toggleDictation,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            _isListening ? 'Listening (Hindi / English)...' : 'Tap mic to speak task',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: _isListening ? Colors.red : const Color(0xFF64748B),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Schedule Row (Now vs Later)
              const Text(
                'When should the assistant arrive?',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.bolt_rounded, color: Color(0xFF0F766E)),
                      label: const Text('Right Now (ASAP)'),
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: Color(0xFF0F766E), width: 1.5),
                        backgroundColor: const Color(0xFF0F766E).withValues(alpha: 0.05),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        final d = await showDatePicker(
                          context: context,
                          initialDate: _selectedDate,
                          firstDate: DateTime.now(),
                          lastDate: DateTime.now().add(const Duration(days: 7)),
                        );
                        if (d != null) setState(() => _selectedDate = d);
                      },
                      icon: const Icon(Icons.calendar_today_rounded, size: 16),
                      label: const Text('Schedule Later'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Estimated Duration Selector (Min 30 mins)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Estimated Duration',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  Text(
                    '$_estimatedMinutes Minutes',
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF0F766E),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Slider(
                value: _estimatedMinutes.toDouble(),
                min: 30,
                max: 240,
                divisions: 14,
                activeColor: const Color(0xFF0F766E),
                label: '$_estimatedMinutes mins',
                onChanged: (val) => setState(() => _estimatedMinutes = val.toInt()),
              ),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('30 mins (Minimum Floor)', style: TextStyle(fontSize: 11, color: Colors.grey)),
                  Text('4 Hours max per slot', style: TextStyle(fontSize: 11, color: Colors.grey)),
                ],
              ),
              const SizedBox(height: 32),

              ElevatedButton(
                onPressed: _taskController.text.trim().isNotEmpty
                    ? () {
                        Navigator.of(context).pushNamed(
                          '/services',
                          arguments: {
                            'task_description': _taskController.text.trim(),
                            'estimated_mins': _estimatedMinutes,
                          },
                        );
                      }
                    : null,
                child: const Text('Choose Service & Check Rate'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
