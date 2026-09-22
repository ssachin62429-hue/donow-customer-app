// File: lib/partner/screens/partner_active_task_screen.dart
import 'package:flutter/material.dart';
import '../services/partner_state_service.dart';
import '../models/partner_task.dart';
import 'partner_meter_screen.dart';

class PartnerActiveTaskScreen extends StatefulWidget {
  const PartnerActiveTaskScreen({super.key});

  @override
  State<PartnerActiveTaskScreen> createState() => _PartnerActiveTaskScreenState();
}

class _PartnerActiveTaskScreenState extends State<PartnerActiveTaskScreen> {
  final PartnerStateService _partnerService = PartnerStateService();
  bool _arrivedAtSpot = false;
  final TextEditingController _pinController = TextEditingController();

  @override
  void dispose() {
    _pinController.dispose();
    super.dispose();
  }

  void _markArrived() {
    setState(() {
      _arrivedAtSpot = true;
    });
    _partnerService.markArrived();
    _showPinDialog();
  }

  void _showPinDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: const Row(
            children: [
              Icon(Icons.pin, color: Color(0xFF0F766E)),
              SizedBox(width: 8),
              Text('Ask Customer PIN', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Enter the 4-digit Security PIN displayed on customer screen to start the live meter.',
                style: TextStyle(color: Colors.black87, fontSize: 13),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: TextField(
                  controller: _pinController,
                  keyboardType: TextInputType.number,
                  maxLength: 4,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, letterSpacing: 8),
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    counterText: '',
                    hintText: 'PIN',
                  ),
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Demo PIN: 7482',
                style: TextStyle(fontSize: 12, color: Colors.teal, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                final enteredPin = _pinController.text.trim();
                final success = _partnerService.verifyPinAndStartMeter(enteredPin);
                if (success) {
                  Navigator.pop(ctx);
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const PartnerMeterScreen(),
                    ),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Invalid PIN! Please check with customer.'),
                      backgroundColor: Colors.red,
                    ),
                  );
                }
              },
              child: const Text('Start Meter'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final task = _partnerService.currentTask ??
        PartnerTask(
          id: 'DN-89210',
          customerName: 'Amit Verma',
          customerPhone: '+91 94520 12345',
          serviceName: 'Govt Office & Queue Waiting',
          address: 'General Post Office, Hazratganj, Lucknow',
          landmark: 'Hazratganj GPO, Counter 4 Gate',
          meetingNotes: 'Blue shirt, holding Aadhaar form documents',
          distanceKm: 1.2,
          securityPin: '7482',
        );

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Navigation to Spot'),
        actions: [
          IconButton(
            icon: const Icon(Icons.emergency_outlined, color: Colors.red),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('112 Emergency SOS alert ready.'),
                  backgroundColor: Colors.red,
                ),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Map Representation
          Expanded(
            child: Container(
              color: Colors.blueGrey.shade100,
              child: Stack(
                children: [
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.navigation, color: Color(0xFF0F766E), size: 48),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 6)],
                          ),
                          child: const Text(
                            'ETA: 4 Mins (1.2 km away)',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Positioned(
                    top: 16,
                    left: 16,
                    right: 16,
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F172A),
                        borderRadius: BorderRadius.circular(14),
                        boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 8)],
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.turn_right, color: Colors.greenAccent, size: 28),
                          SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'In 200m, turn left towards GPO Gate 2',
                                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                                ),
                                Text('Hazratganj Main Market Road', style: TextStyle(color: Colors.white70, fontSize: 12)),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Bottom Customer Card & Arrival Handshake
          Container(
            padding: const EdgeInsets.all(20),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              boxShadow: [
                BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, -4)),
              ],
            ),
            child: SafeArea(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const CircleAvatar(
                            radius: 22,
                            backgroundColor: Color(0xFF0F766E),
                            child: Icon(Icons.person, color: Colors.white),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                task.customerName,
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                              ),
                              Text(
                                task.serviceName,
                                style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          IconButton.filledTonal(
                            icon: const Icon(Icons.call, color: Color(0xFF0F766E)),
                            onPressed: () {},
                          ),
                          const SizedBox(width: 8),
                          IconButton.filledTonal(
                            icon: const Icon(Icons.chat_bubble_outline, color: Color(0xFF0F766E)),
                            onPressed: () {},
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Spot & Meeting Notes
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.grey.shade200),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.location_pin, color: Colors.redAccent, size: 16),
                            const SizedBox(width: 6),
                            Expanded(
                              child: Text(
                                task.landmark,
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            const Icon(Icons.info_outline, color: Colors.blueGrey, size: 16),
                            const SizedBox(width: 6),
                            Expanded(
                              child: Text(
                                task.meetingNotes,
                                style: TextStyle(color: Colors.grey.shade700, fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Arrive / Enter PIN Button
                  ElevatedButton(
                    onPressed: _arrivedAtSpot ? _showPinDialog : _markArrived,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _arrivedAtSpot ? Colors.teal.shade800 : const Color(0xFF0F766E),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(_arrivedAtSpot ? Icons.pin : Icons.where_to_vote, size: 20),
                        const SizedBox(width: 8),
                        Text(
                          _arrivedAtSpot ? 'ENTER 4-DIGIT PIN' : 'I HAVE ARRIVED AT SPOT (50m)',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
