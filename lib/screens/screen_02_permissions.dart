import 'package:flutter/material.dart';

// File: lib/screens/screen_02_permissions.dart
/// Screen 2 — Permissions: Location, Notifications, Camera, and Microphone setup with toggle states
class Screen02Permissions extends StatefulWidget {
  const Screen02Permissions({super.key});

  @override
  State<Screen02Permissions> createState() => _Screen02PermissionsState();
}

class _Screen02PermissionsState extends State<Screen02Permissions> {
  bool _locationGranted = true;
  bool _notificationsGranted = true;
  bool _cameraGranted = false;
  bool _micGranted = false;

  void _proceedToLogin() {
    if (!_locationGranted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Precise GPS Location is required to dispatch assistants.'),
          backgroundColor: Color(0xFFDC2626),
        ),
      );
      return;
    }
    Navigator.of(context).pushReplacementNamed('/login');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('App Permissions'),
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Help Us Serve You Better',
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w800,
                  color: const Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'To coordinate live tasks, dispatch nearby assistants, and securely communicate, please enable the following permissions:',
                style: TextStyle(
                  fontSize: 13,
                  color: Color(0xFF64748B),
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 24),

              // Permissions Cards
              _buildPermissionTile(
                icon: Icons.location_on_rounded,
                title: 'Precise Location (Required)',
                subtitle: 'Accurate doorstep pin-drop & real-time 50m partner arrival detection.',
                value: _locationGranted,
                isRequired: true,
                onChanged: (v) => setState(() => _locationGranted = v),
              ),
              const SizedBox(height: 12),
              _buildPermissionTile(
                icon: Icons.notifications_active_rounded,
                title: 'Push Notifications (Recommended)',
                subtitle: 'Receive real-time 45s offer alerts, PIN arrivals, and invoice receipts.',
                value: _notificationsGranted,
                isRequired: false,
                onChanged: (v) => setState(() => _notificationsGranted = v),
              ),
              const SizedBox(height: 12),
              _buildPermissionTile(
                icon: Icons.camera_alt_rounded,
                title: 'Camera Access (Optional)',
                subtitle: 'Scan UPI QR codes directly at doorstep or capture task items.',
                value: _cameraGranted,
                isRequired: false,
                onChanged: (v) => setState(() => _cameraGranted = v),
              ),
              const SizedBox(height: 12),
              _buildPermissionTile(
                icon: Icons.mic_rounded,
                title: 'Microphone Access (Optional)',
                subtitle: 'Enable voice dictation while describing your emergency or custom task.',
                value: _micGranted,
                isRequired: false,
                onChanged: (v) => setState(() => _micGranted = v),
              ),

              const Spacer(),

              ElevatedButton(
                onPressed: _proceedToLogin,
                child: const Text('Continue to Login'),
              ),
              const SizedBox(height: 12),
              const Center(
                child: Text(
                  'You can modify these permissions at any time in system settings.',
                  style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPermissionTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required bool isRequired,
    required ValueChanged<bool> onChanged,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: value ? const Color(0xFF0F766E).withValues(alpha: 0.4) : const Color(0xFFE2E8F0),
        ),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: value ? const Color(0xFF0F766E).withValues(alpha: 0.1) : const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              icon,
              color: value ? const Color(0xFF0F766E) : const Color(0xFF64748B),
              size: 24,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            activeColor: const Color(0xFF0F766E),
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}
