import 'package:flutter/material.dart';

// File: lib/screens/screen_22_profile_tab.dart
/// Screen 22 — Profile Tab: User profile, one-tap Hindi/English language toggle, legal policies, and logout
class Screen22ProfileTab extends StatefulWidget {
  const Screen22ProfileTab({super.key});

  @override
  State<Screen22ProfileTab> createState() => _Screen22ProfileTabState();
}

class _Screen22ProfileTabState extends State<Screen22ProfileTab> {
  String _selectedLanguage = 'English';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('My Profile'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            children: [
              // Profile Summary Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Row(
                  children: [
                    const CircleAvatar(
                      radius: 30,
                      backgroundColor: Color(0xFF0F766E),
                      child: Text('AK', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
                    ),
                    const SizedBox(width: 16),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Alok Kumar',
                            style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                          ),
                          SizedBox(height: 2),
                          Text(
                            '+91 98765 43210 (Verified)',
                            style: TextStyle(fontSize: 13, color: Color(0xFF64748B), fontWeight: FontWeight.w600),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Lucknow, Uttar Pradesh',
                            style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.edit_outlined, size: 20, color: Color(0xFF0F766E)),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Language Toggle Tile
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.translate_rounded, color: Color(0xFF0F766E), size: 22),
                        SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'App Language',
                              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Color(0xFF0F172A)),
                            ),
                            Text(
                              'English / हिंदी',
                              style: TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                            ),
                          ],
                        ),
                      ],
                    ),
                    SegmentedButton<String>(
                      segments: const [
                        ButtonSegment(value: 'English', label: Text('EN')),
                        ButtonSegment(value: 'Hindi', label: Text('हिंदी')),
                      ],
                      selected: {_selectedLanguage},
                      onSelectionChanged: (set) {
                        setState(() => _selectedLanguage = set.first);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Language set to $_selectedLanguage')),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Quick Actions List
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  children: [
                    _buildSettingsTile(
                      icon: Icons.shield_rounded,
                      title: 'SOS & Emergency Safety',
                      color: const Color(0xFFDC2626),
                      onTap: () => Navigator.of(context).pushNamed('/sos'),
                    ),
                    const Divider(height: 1, color: Color(0xFFF1F5F9)),
                    _buildSettingsTile(
                      icon: Icons.help_outline_rounded,
                      title: 'Support & FAQs',
                      color: const Color(0xFF0F766E),
                      onTap: () => Navigator.of(context).pushNamed('/support-faq'),
                    ),
                    const Divider(height: 1, color: Color(0xFFF1F5F9)),
                    _buildSettingsTile(
                      icon: Icons.description_outlined,
                      title: 'Terms of Service & Privacy',
                      color: const Color(0xFF475569),
                      onTap: () => Navigator.of(context).pushNamed('/support-faq'),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Logout Button
              OutlinedButton.icon(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      title: const Text('Confirm Logout'),
                      content: const Text('Are you sure you want to log out of DoNow?'),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.of(ctx).pop(),
                          child: const Text('Cancel'),
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFDC2626)),
                          onPressed: () {
                            Navigator.of(ctx).pop();
                            Navigator.of(context).pushNamedAndRemoveUntil('/login', (route) => false);
                          },
                          child: const Text('Log Out'),
                        ),
                      ],
                    ),
                  );
                },
                icon: const Icon(Icons.logout_rounded, color: Color(0xFFDC2626)),
                label: const Text('Log Out of DoNow', style: TextStyle(color: Color(0xFFDC2626))),
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size.fromHeight(48),
                  side: const BorderSide(color: Color(0xFFDC2626)),
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                'DoNow Customer App v1.0.0 (Lucknow Beta)\nDirect P2P Micro-Assistance Marketplace',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSettingsTile({
    required IconData icon,
    required String title,
    required Color color,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(icon, color: color, size: 22),
      title: Text(
        title,
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Color(0xFF0F172A)),
      ),
      trailing: const Icon(Icons.chevron_right_rounded, color: Color(0xFF94A3B8)),
      onTap: onTap,
    );
  }
}
