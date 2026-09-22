// File: lib/partner/screens/partner_earnings_screen.dart
import 'package:flutter/material.dart';
import '../services/partner_state_service.dart';

class PartnerEarningsScreen extends StatelessWidget {
  const PartnerEarningsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final partnerService = PartnerStateService();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Earnings & Payouts'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Weekly Total Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF0F766E), Color(0xFF134E4A)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('THIS WEEK TOTAL EARNINGS', style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 6),
                    const Text('₹5,420.00', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900)),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Next Auto Payout: Monday 10 AM', style: TextStyle(color: Colors.white70, fontSize: 12)),
                        ActionChip(
                          label: const Text('Instant Transfer', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                          backgroundColor: Colors.white.withOpacity(0.2),
                          side: BorderSide.none,
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Instant Payout of ₹5,420 initiated to your linked Bank Account.')),
                            );
                          },
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Daily Incentive Milestone
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Today Daily Bonus', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        Text('₹150 Bonus', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F766E), fontSize: 13)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    LinearProgressIndicator(
                      value: partnerService.todayCompletedTasks / 5.0,
                      backgroundColor: Colors.grey.shade200,
                      valueColor: const AlwaysStoppedAnimation(Color(0xFF0F766E)),
                      minHeight: 8,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '${partnerService.todayCompletedTasks} of 5 tasks completed. Complete 1 more task to get ₹150 extra cash!',
                      style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Recent Task History
              const Text('Recent Completed Tasks', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              const SizedBox(height: 12),

              _buildHistoryCard('Govt Office Queue Waiting', 'Hazratganj GPO', '150 Mins', '₹340.00', 'Today, 2:15 PM'),
              const SizedBox(height: 10),
              _buildHistoryCard('Hospital OPD Token Line', 'Civil Hospital Lucknow', '90 Mins', '₹220.00', 'Today, 11:30 AM'),
              const SizedBox(height: 10),
              _buildHistoryCard('Temple Darshan Queue Waiter', 'Hanuman Setu Temple', '60 Mins', '₹160.00', 'Yesterday, 6:00 PM'),
              const SizedBox(height: 10),
              _buildHistoryCard('Urgent Document Courier', 'Nagar Nigam to RTO', '45 Mins', '₹120.00', 'Yesterday, 3:30 PM'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHistoryCard(String title, String location, String duration, String amount, String time) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F766E).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.check_circle, color: Color(0xFF0F766E), size: 20),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  const SizedBox(height: 2),
                  Text('$location • $duration', style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
                  Text(time, style: TextStyle(color: Colors.grey.shade400, fontSize: 10)),
                ],
              ),
            ],
          ),
          Text(amount, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF0F172A))),
        ],
      ),
    );
  }
}
