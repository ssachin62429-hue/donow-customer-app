import 'package:flutter/material.dart';

// File: lib/screens/screen_05_create_profile.dart
/// Screen 5 — Create Profile: Name input, verified mobile badge, and Terms agreement checkbox
class Screen05CreateProfile extends StatefulWidget {
  const Screen05CreateProfile({super.key});

  @override
  State<Screen05CreateProfile> createState() => _Screen05CreateProfileState();
}

class _Screen05CreateProfileState extends State<Screen05CreateProfile> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  bool _agreedToTerms = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  void _submitProfile() {
    if (_nameController.text.trim().length < 2) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please enter your full legal name.'),
          backgroundColor: Color(0xFFDC2626),
        ),
      );
      return;
    }

    if (!_agreedToTerms) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('You must agree to DoNow Terms & Direct Cash Policy.'),
          backgroundColor: Color(0xFFDC2626),
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    Future.delayed(const Duration(milliseconds: 600), () {
      if (mounted) {
        setState(() => _isLoading = false);
        Navigator.of(context).pushNamedAndRemoveUntil('/home', (route) => false);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?) ?? {};
    final phone = (args['phone'] as String?) ?? '9876543210';
    final isValid = _nameController.text.trim().length >= 2 && _agreedToTerms;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Create Profile'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Complete Your Account',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 6),
              const Text(
                'Field assistants will address you by this name upon doorstep arrival.',
                style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 24),

              // Verified Mobile Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: const Color(0xFF0F766E).withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: const Color(0xFF0F766E).withValues(alpha: 0.25),
                  ),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.check_circle_rounded,
                        color: Color(0xFF047857), size: 20),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        'Verified Mobile: +91 $phone',
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF0F766E),
                        ),
                      ),
                    ),
                    const Icon(Icons.lock_rounded, size: 16, color: Color(0xFF64748B)),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Name Input
              const Text(
                'Full Name *',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF334155),
                ),
              ),
              const SizedBox(height: 6),
              TextField(
                controller: _nameController,
                textCapitalization: TextCapitalization.words,
                decoration: InputDecoration(
                  hintText: 'e.g. Amit Kumar',
                  filled: true,
                  fillColor: Colors.white,
                  prefixIcon: const Icon(Icons.person_rounded, size: 20),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: const BorderSide(color: Color(0xFF0F766E), width: 1.5),
                  ),
                ),
                onChanged: (_) => setState(() {}),
              ),
              const SizedBox(height: 18),

              // Email Input (Optional)
              const Text(
                'Email Address (For Invoices)',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF334155),
                ),
              ),
              const SizedBox(height: 6),
              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                  hintText: 'amit.kumar@gmail.com (Optional)',
                  filled: true,
                  fillColor: Colors.white,
                  prefixIcon: const Icon(Icons.email_rounded, size: 20),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: const BorderSide(color: Color(0xFF0F766E), width: 1.5),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Terms Agreement Checkbox
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Checkbox(
                    value: _agreedToTerms,
                    activeColor: const Color(0xFF0F766E),
                    onChanged: (v) => setState(() => _agreedToTerms = v ?? false),
                  ),
                  const Expanded(
                    child: Padding(
                      padding: EdgeInsets.only(top: 8.0),
                      child: Text(
                        'I understand that DoNow operates on a direct Peer-to-Peer cash/UPI payment model with a 30-minute minimum billing floor.',
                        style: TextStyle(fontSize: 12, color: Color(0xFF64748B), height: 1.3),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              ElevatedButton(
                onPressed: isValid && !_isLoading ? _submitProfile : null,
                child: _isLoading
                    ? const SizedBox(
                        height: 22,
                        width: 22,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                      )
                    : const Text('Start Using DoNow'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
