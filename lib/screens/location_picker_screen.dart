import 'package:flutter/material.dart';
import 'home_screen.dart';

/// Screen 06: Precision Location & Address Confirmation
/// Enforces mandatory landmark (>= 5 chars) and doorstep arrival precision
class LocationPickerScreen extends StatefulWidget {
  const LocationPickerScreen({super.key});

  @override
  State<LocationPickerScreen> createState() => _LocationPickerScreenState();
}

class _LocationPickerScreenState extends State<LocationPickerScreen> {
  final TextEditingController _landmarkController = TextEditingController();
  final String _currentAddress = 'KGMU Trauma Center, Shah Mina Rd, Chowk, Lucknow';
  bool _isLocating = false;

  @override
  void dispose() {
    _landmarkController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final service = ModalRoute.of(context)?.settings.arguments as DoNowService? ??
        kCoreServices.first;

    final hasValidLandmark = _landmarkController.text.trim().length >= 5;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Confirm Pickup Location'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Map Viewport Simulation with Center Target Crosshair
            Expanded(
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Vector Map Grid Representation
                  Container(
                    width: double.infinity,
                    color: const Color(0xFFE2E8F0),
                    child: CustomPaint(
                      painter: _MapGridPainter(),
                    ),
                  ),

                  // Center Pin Marker with Shadow
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text(
                          'Assistant arrives here',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Icon(
                        Icons.location_on_rounded,
                        size: 44,
                        color: Color(0xFFDC2626),
                      ),
                      Container(
                        width: 10,
                        height: 4,
                        decoration: BoxDecoration(
                          color: Colors.black.withValues(alpha: 0.3),
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),

                  // Re-Center Floating Button
                  Positioned(
                    right: 16,
                    bottom: 16,
                    child: FloatingActionButton.small(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFF0F172A),
                      onPressed: () {
                        setState(() => _isLocating = true);
                        Future.delayed(const Duration(milliseconds: 600), () {
                          if (mounted) setState(() => _isLocating = false);
                        });
                      },
                      child: _isLocating
                          ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Icon(Icons.my_location_rounded),
                    ),
                  ),
                ],
              ),
            ),

            // Bottom Confirmation Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black12,
                    blurRadius: 16,
                    offset: Offset(0, -4),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Address Pill
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(
                        Icons.near_me_rounded,
                        size: 20,
                        color: Color(0xFF0F766E),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Doorstep Location',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: Color(0xFF64748B),
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              _currentAddress,
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w700,
                                color: Color(0xFF0F172A),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Mandatory Landmark Field (>= 5 chars required)
                  TextField(
                    controller: _landmarkController,
                    onChanged: (_) => setState(() {}),
                    decoration: InputDecoration(
                      hintText: 'Enter Gate No., Tower, or Landmark (e.g., Gate 2 OPD)',
                      hintStyle: const TextStyle(fontSize: 13, color: Color(0xFF94A3B8)),
                      prefixIcon: const Icon(Icons.apartment_rounded, size: 20),
                      filled: true,
                      fillColor: const Color(0xFFF8FAFC),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: Color(0xFF0F766E), width: 1.5),
                      ),
                      helperText: 'Mandatory landmark ensures assistant reaches exact door (Min 5 chars)',
                      helperStyle: TextStyle(
                        fontSize: 11,
                        color: hasValidLandmark
                            ? const Color(0xFF047857)
                            : const Color(0xFF94A3B8),
                      ),
                    ),
                  ),
                  const SizedBox(height: 18),

                  // Confirm & Proceed Button
                  ElevatedButton(
                    onPressed: hasValidLandmark
                        ? () {
                            Navigator.of(context).pushNamed(
                              '/booking-review',
                              arguments: {
                                'service': service,
                                'address': _currentAddress,
                                'landmark': _landmarkController.text.trim(),
                              },
                            );
                          }
                        : null,
                    child: const Text('Confirm Location & Review Fare'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Simulated Map Road Painter
class _MapGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final roadPaint = Paint()
      ..color = Colors.white
      ..strokeWidth = 14;

    final secondaryPaint = Paint()
      ..color = const Color(0xFFCBD5E1)
      ..strokeWidth = 4;

    canvas.drawLine(Offset(0, size.height * 0.45),
        Offset(size.width, size.height * 0.45), roadPaint);
    canvas.drawLine(Offset(size.width * 0.55, 0),
        Offset(size.width * 0.55, size.height), roadPaint);

    canvas.drawLine(Offset(0, size.height * 0.2),
        Offset(size.width, size.height * 0.8), secondaryPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
