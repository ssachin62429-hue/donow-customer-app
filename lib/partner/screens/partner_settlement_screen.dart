// File: lib/partner/screens/partner_settlement_screen.dart
import 'package:flutter/material.dart';
import '../services/partner_state_service.dart';

class PartnerSettlementScreen extends StatefulWidget {
  const PartnerSettlementScreen({super.key});

  @override
  State<PartnerSettlementScreen> createState() => _PartnerSettlementScreenState();
}

class _PartnerSettlementScreenState extends State<PartnerSettlementScreen> {
  final PartnerStateService _partnerService = PartnerStateService();
  String _selectedPaymentMode = 'UPI QR';

  @override
  Widget build(BuildContext context) {
    final task = _partnerService.currentTask;
    final elapsedMinutes = task?.elapsedMinutes ?? 150;
    final serviceFare = (elapsedMinutes * 2.0);
    final tip = task?.tipAmount ?? 40.0;
    final total = serviceFare + tip;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Payment Collection'),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Summary Header
              Center(
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0F766E).withOpacity(0.1),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.currency_rupee, color: Color(0xFF0F766E), size: 40),
                    ),
                    const SizedBox(height: 12),
                    const Text('Total Amount to Collect', style: TextStyle(color: Colors.grey, fontSize: 14)),
                    const SizedBox(height: 4),
                    Text(
                      '₹${total.toStringAsFixed(0)}',
                      style: const TextStyle(fontSize: 40, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Itemized Bill Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.grey.shade200),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 4)),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Itemized Breakdown',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 14),
                    _buildRow('Service', task?.serviceName ?? 'Govt Office Queue Waiting'),
                    const SizedBox(height: 10),
                    _buildRow('Time at Spot', '$elapsedMinutes Minutes'),
                    const SizedBox(height: 10),
                    _buildRow('Rate per Minute', '₹2.00 / Min'),
                    const SizedBox(height: 10),
                    _buildRow('Queue Service Fare', '₹${serviceFare.toStringAsFixed(0)}'),
                    const SizedBox(height: 10),
                    _buildRow('Customer Tip (100% to you)', '₹${tip.toStringAsFixed(0)}', isHighlight: true),
                    const Divider(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Net Payable by Customer',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                        Text(
                          '₹${total.toStringAsFixed(0)}',
                          style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Color(0xFF0F766E)),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Payment Method Selection
              const Text(
                'Collection Mode',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: _buildPaymentOption(
                      title: 'Show My UPI QR',
                      subtitle: 'PhonePe / GPay',
                      icon: Icons.qr_code_2,
                      isSelected: _selectedPaymentMode == 'UPI QR',
                      onTap: () {
                        setState(() => _selectedPaymentMode = 'UPI QR');
                        _showQrDialog(total);
                      },
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: _buildPaymentOption(
                      title: 'Collect Cash',
                      subtitle: 'Physical notes',
                      icon: Icons.money,
                      isSelected: _selectedPaymentMode == 'Cash',
                      onTap: () {
                        setState(() => _selectedPaymentMode = 'Cash');
                      },
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 30),

              // Confirm Payment Received
              ElevatedButton(
                onPressed: () {
                  _partnerService.confirmPaymentSettled();
                  showDialog(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                      title: const Row(
                        children: [
                          Icon(Icons.check_circle, color: Color(0xFF16A34A)),
                          SizedBox(width: 8),
                          Text('Settlement Done!'),
                        ],
                      ),
                      content: Text(
                        '₹${total.toStringAsFixed(0)} added to your today earnings ledger. Great job!',
                        style: const TextStyle(fontSize: 14),
                      ),
                      actions: [
                        ElevatedButton(
                          onPressed: () {
                            Navigator.pop(ctx);
                            Navigator.popUntil(context, (route) => route.isFirst);
                          },
                          child: const Text('Back to Duty'),
                        ),
                      ],
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF16A34A),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.verified, size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'CONFIRM RECEIVED ₹${total.toStringAsFixed(0)}',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showQrDialog(double amount) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Scan & Pay to Partner'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey.shade300),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(Icons.qr_code_2, size: 180, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 12),
            Text(
              'Amount: ₹${amount.toStringAsFixed(0)}',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F766E)),
            ),
            const SizedBox(height: 4),
            const Text(
              'UPI: rahul.sharma@okaxis',
              style: TextStyle(fontSize: 13, color: Colors.grey),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Done Scanning'),
          ),
        ],
      ),
    );
  }

  Widget _buildRow(String label, String value, {bool isHighlight = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(color: Colors.grey.shade700, fontSize: 13)),
        Text(
          value,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 13,
            color: isHighlight ? const Color(0xFF0F766E) : const Color(0xFF0F172A),
          ),
        ),
      ],
    );
  }

  Widget _buildPaymentOption({
    required String title,
    required String subtitle,
    required IconData icon,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFFE6FFFA) : Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? const Color(0xFF0F766E) : Colors.grey.shade300,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: isSelected ? const Color(0xFF0F766E) : Colors.grey.shade700, size: 28),
            const SizedBox(height: 10),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 2),
            Text(subtitle, style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
          ],
        ),
      ),
    );
  }
}
