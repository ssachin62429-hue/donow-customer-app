// File: lib/partner/screens/partner_profile_screen.dart
import 'package:flutter/material.dart';
import '../services/partner_state_service.dart';

class PartnerProfileScreen extends StatelessWidget {
  const PartnerProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final service = PartnerStateService();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Partner Profile & KYC'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              // Partner Badge Card
              Center(
                child: Column(
                  children: [
                    Stack(
                      children: [
                        const CircleAvatar(
                          radius: 46,
                          backgroundColor: Color(0xFF0F766E),
                          child: Icon(Icons.person, color: Colors.white, size: 52),
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Colors.blue,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.verified, color: Colors.white, size: 20),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      service.partnerName,
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'DoNow Verified Assistant • Lucknow ID: ${service.partnerId}',
                      style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.amber.shade50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.amber.shade300),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.star, color: Colors.amber, size: 16),
                          const SizedBox(width: 4),
                          Text(
                            '${service.rating} ★ Rating (${service.totalJobsDone} Jobs Done)',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Trust & Verification Badges
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Trust & Safety Verifications', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                    const SizedBox(height: 14),
                    _buildVerificationRow('Aadhaar Card (UIDAI Verified)', 'XXXX-XXXX-4819', Icons.fingerprint, isVerified: true),
                    const Divider(height: 20),
                    _buildVerificationRow('Police Background Clearance', 'UP Police Issued', Icons.local_police_outlined, isVerified: true),
                    const Divider(height: 20),
                    _buildVerificationRow('Direct Bank Settlement UPI', 'rahul.sharma@okaxis', Icons.account_balance, isVerified: true),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Safety & SOS Distress Trigger
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: Colors.red.shade200),
                ),
                child: Column(
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.emergency_share, color: Colors.red, size: 24),
                        SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Emergency SOS (112 Desk)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.red, fontSize: 14)),
                              Text('Press to broadcast live GPS to DoNow safety desk & police', style: TextStyle(fontSize: 11, color: Colors.black87)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(44),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('🚨 SOS Distress beacon activated. DoNow Safety Desk has been alerted.'),
                            backgroundColor: Colors.red,
                          ),
                        );
                      },
                      child: const Text('TRIGGER EMERGENCY SOS (112)'),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Switch Back to Customer Mode
              OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size.fromHeight(48),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  side: const BorderSide(color: Color(0xFF0F766E)),
                ),
                icon: const Icon(Icons.swap_horiz, color: Color(0xFF0F766E)),
                label: const Text('Switch to Customer Mode', style: TextStyle(color: Color(0xFF0F766E), fontWeight: FontWeight.bold)),
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/home');
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildVerificationRow(String title, String subtitle, IconData icon, {required bool isVerified}) {
    return Row(
      children: [
        Icon(icon, color: const Color(0xFF0F766E), size: 22),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              Text(subtitle, style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          decoration: BoxDecoration(
            color: Colors.green.shade50,
            borderRadius: BorderRadius.circular(6),
            border: Border.all(color: Colors.green.shade300),
          ),
          child: const Text('VERIFIED', style: TextStyle(color: Colors.green, fontSize: 10, fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }
}
