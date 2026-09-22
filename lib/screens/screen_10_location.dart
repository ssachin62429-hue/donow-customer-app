import 'package:flutter/material.dart';

// File: lib/screens/screen_10_location.dart
/// Screen 10 — Location: Current GPS button, search bar, interactive map with pin adjustment, landmark, and meeting instructions
class Screen10Location extends StatefulWidget {
  const Screen10Location({super.key});

  @override
  State<Screen10Location> createState() => _Screen10LocationState();
}

class _Screen10LocationState extends State<Screen10Location> {
  final TextEditingController _landmarkController = TextEditingController(text: 'Opposite Cathedral School Main Gate');
  final TextEditingController _instructionsController = TextEditingController(text: 'Wait near the tea stall with blue canopy');
  String _currentAddress = 'Hazratganj Main Market, Lucknow, Uttar Pradesh 226001';
  bool _isLocating = false;

  @override
  void dispose() {
    _landmarkController.dispose();
    _instructionsController.dispose();
    super.dispose();
  }

  void _reLocate() {
    setState(() => _isLocating = true);
    Future.delayed(const Duration(milliseconds: 700), () {
      if (mounted) {
        setState(() {
          _isLocating = false;
          _currentAddress = 'GPO Crossing, Vidhan Sabha Marg, Hazratganj, Lucknow';
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('GPS Pin Re-centered accurately (±3m error margin)')),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final args = (ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?) ?? {};
    final isLandmarkValid = _landmarkController.text.trim().length >= 5;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Set Meeting Location'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Map Visual Simulation Container
            Expanded(
              flex: 4,
              child: Stack(
                children: [
                  Container(
                    width: double.infinity,
                    color: const Color(0xFFE2E8F0),
                    child: CustomPaint(
                      painter: _MapGridPainter(),
                      child: Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                              decoration: BoxDecoration(
                                color: const Color(0xFF0F172A),
                                borderRadius: BorderRadius.circular(20),
                                boxShadow: const [
                                  BoxShadow(color: Colors.black26, blurRadius: 6, offset: Offset(0, 2)),
                                ],
                              ),
                              child: const Text(
                                'Doorstep Meeting Pin',
                                style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700),
                              ),
                            ),
                            const SizedBox(height: 4),
                            const Icon(
                              Icons.location_on_rounded,
                              size: 46,
                              color: Color(0xFF0F766E),
                            ),
                            Container(
                              width: 14,
                              height: 6,
                              decoration: BoxDecoration(
                                color: Colors.black.withValues(alpha: 0.25),
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),

                  // GPS Re-center FAB
                  Positioned(
                    right: 16,
                    bottom: 16,
                    child: FloatingActionButton.small(
                      onPressed: _isLocating ? null : _reLocate,
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFF0F766E),
                      child: _isLocating
                          ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF0F766E)),
                            )
                          : const Icon(Icons.my_location_rounded),
                    ),
                  ),

                  // Geofence info badge
                  Positioned(
                    top: 12,
                    left: 16,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.95),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.radar_rounded, size: 14, color: Color(0xFF047857)),
                          SizedBox(width: 6),
                          Text(
                            '50m Strict Geofence Enabled',
                            style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF047857)),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Bottom Form Details Container
            Expanded(
              flex: 5,
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(24),
                    topRight: Radius.circular(24),
                  ),
                  boxShadow: [
                    BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, -3)),
                  ],
                ),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Address Preview
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(Icons.place_rounded, color: Color(0xFF0F766E), size: 22),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Selected Location',
                                  style: TextStyle(fontSize: 11, color: Color(0xFF64748B), fontWeight: FontWeight.w600),
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
                      const Divider(height: 1, color: Color(0xFFF1F5F9)),
                      const SizedBox(height: 14),

                      // Mandatory Landmark Input (>= 5 chars)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Mandatory Landmark *',
                            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF334155)),
                          ),
                          Text(
                            isLandmarkValid ? 'Valid' : 'Min 5 characters required',
                            style: TextStyle(
                              fontSize: 11,
                              color: isLandmarkValid ? const Color(0xFF047857) : const Color(0xFFDC2626),
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _landmarkController,
                        decoration: InputDecoration(
                          hintText: 'e.g. Near Metro Pillar 42, Opposite Sharma Tea',
                          filled: true,
                          fillColor: const Color(0xFFF8FAFC),
                          prefixIcon: const Icon(Icons.flag_rounded, size: 20),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFF0F766E), width: 1.5),
                          ),
                        ),
                        onChanged: (_) => setState(() {}),
                      ),
                      const SizedBox(height: 14),

                      // Meeting Instructions
                      const Text(
                        'Doorstep Meeting Notes',
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF334155)),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _instructionsController,
                        decoration: InputDecoration(
                          hintText: 'e.g. Ring Bell #204, or call on arrival',
                          filled: true,
                          fillColor: const Color(0xFFF8FAFC),
                          prefixIcon: const Icon(Icons.meeting_room_rounded, size: 20),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFF0F766E), width: 1.5),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),

                      ElevatedButton(
                        onPressed: isLandmarkValid
                            ? () {
                                Navigator.of(context).pushNamed(
                                  '/booking-summary',
                                  arguments: {
                                    ...args,
                                    'address': _currentAddress,
                                    'landmark': _landmarkController.text.trim(),
                                    'instructions': _instructionsController.text.trim(),
                                  },
                                );
                              }
                            : null,
                        child: const Text('Confirm Location & Review Fare'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MapGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFCBD5E1)
      ..strokeWidth = 1.0;

    for (double i = 0; i < size.width; i += 40) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), paint);
    }
    for (double j = 0; j < size.height; j += 40) {
      canvas.drawLine(Offset(0, j), Offset(size.width, j), paint);
    }

    // Geofence circle
    final circlePaint = Paint()
      ..color = const Color(0xFF0F766E).withValues(alpha: 0.12)
      ..style = PaintingStyle.fill;
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), 70, circlePaint);

    final circleBorder = Paint()
      ..color = const Color(0xFF0F766E).withValues(alpha: 0.4)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), 70, circleBorder);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
