import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// DoNow Customer App - Screen 01: Splash Screen
/// Master Specification v1.0 compliant
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;
  Timer? _navigationTimer;

  @override
  void initState() {
    super.initState();

    // Set immersive edge-to-edge transparent system UI overlay
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
        systemNavigationBarColor: Colors.white,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
    );

    // Initialize entrance animation
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    );

    _fadeAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeIn,
    );

    _scaleAnimation = Tween<double>(begin: 0.85, end: 1.0).animate(
      CurvedAnimation(
        parent: _animationController,
        curve: Curves.easeOutBack,
      ),
    );

    _animationController.forward();

    // 3-Second Timer to navigate to the Next Screen (Phone Auth / Login)
    _startTimer();
  }

  void _startTimer() {
    _navigationTimer = Timer(const Duration(seconds: 3), _navigateToNextScreen);
  }

  void _navigateToNextScreen() {
    if (!mounted) return;

    // Master Specification Screen 02: Phone Authentication Screen
    Navigator.of(context).pushReplacementNamed('/auth');
  }

  @override
  void dispose() {
    _navigationTimer?.cancel();
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC), // Ultra-clean subtle off-white
      body: SafeArea(
        child: Stack(
          children: [
            // Center Content: Logo, Brand Typography & Tagline
            Center(
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: ScaleTransition(
                  scale: _scaleAnimation,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // DoNow Brand Logo Icon with Glassmorphism Card Effect
                      Container(
                        width: 110,
                        height: 110,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(28),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF0F766E).withValues(alpha: 0.12),
                              blurRadius: 30,
                              offset: const Offset(0, 12),
                              spreadRadius: 2,
                            ),
                          ],
                          border: Border.all(
                            color: const Color(0xFFE2E8F0),
                            width: 1.2,
                          ),
                        ),
                        child: Center(
                          // Vector Brand Emblem with fallback
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(24),
                            child: Image.asset(
                              'assets/images/logo.png',
                              width: 72,
                              height: 72,
                              fit: BoxFit.contain,
                              errorBuilder: (context, error, stackTrace) {
                                return Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    Container(
                                      width: 68,
                                      height: 68,
                                      decoration: BoxDecoration(
                                        gradient: const LinearGradient(
                                          colors: [
                                            Color(0xFF0F766E), // DoNow Teal
                                            Color(0xFF047857), // Deep Emerald
                                          ],
                                          begin: Alignment.topLeft,
                                          end: Alignment.bottomRight,
                                        ),
                                        borderRadius: BorderRadius.circular(18),
                                      ),
                                    ),
                                    const Icon(
                                      Icons.bolt_rounded,
                                      size: 42,
                                      color: Colors.white,
                                    ),
                                  ],
                                );
                              },
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Brand Name Typography
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'Do',
                            style: theme.textTheme.headlineLarge?.copyWith(
                              color: const Color(0xFF0F172A),
                              fontWeight: FontWeight.w900,
                              letterSpacing: -0.5,
                              fontSize: 34,
                            ),
                          ),
                          Text(
                            'Now',
                            style: theme.textTheme.headlineLarge?.copyWith(
                              color: const Color(0xFF0F766E),
                              fontWeight: FontWeight.w900,
                              letterSpacing: -0.5,
                              fontSize: 34,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),

                      // Vernacular Hindi Slogan
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 14,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: const Color(0xFFE2E8F0),
                            width: 1,
                          ),
                        ),
                        child: const Text(
                          'काम है? DoNow.',
                          style: TextStyle(
                            fontFamily: 'NotoSansDevanagari',
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF475569),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Official Master Specification English Subtitle
                      const Text(
                        'Physical assistance at your doorstep in minutes.',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                          color: Color(0xFF64748B),
                          letterSpacing: 0.1,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Bottom Footer: Subtle Loading Indicator & Security Badge
            Positioned(
              bottom: 36,
              left: 0,
              right: 0,
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      width: 22,
                      height: 22,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.2,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          const Color(0xFF0F766E).withValues(alpha: 0.8),
                        ),
                      ),
                    ),
                    const SizedBox(height: 18),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.verified_user_outlined,
                          size: 14,
                          color: Colors.grey.shade500,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          '100% KYC Verified Field Assistants',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w500,
                            color: Colors.grey.shade600,
                            letterSpacing: 0.2,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
