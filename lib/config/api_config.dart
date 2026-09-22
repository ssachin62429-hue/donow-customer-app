// File: lib/config/api_config.dart
/// Central configuration for connecting Customer App to Render Backend & Neon PostgreSQL.
class ApiConfig {
  /// Replace with your actual Render web service URL (e.g., https://donow-backend.onrender.com)
  static const String baseUrl = 'https://donow-backend.onrender.com/api/v1';

  // Auth endpoints
  static const String sendOtp = '$baseUrl/auth/send-otp';
  static const String verifyOtp = '$baseUrl/auth/verify-otp';
  static const String createProfile = '$baseUrl/auth/profile';

  // Orders & Task endpoints
  static const String createOrder = '$baseUrl/orders/create';
  static const String activeOrder = '$baseUrl/orders/active';
  static const String orderHistory = '$baseUrl/orders/history';
  static const String cancelOrder = '$baseUrl/orders/cancel';
  static const String addTip = '$baseUrl/orders/tip';
  static const String ratePartner = '$baseUrl/orders/rate';

  // SOS Emergency
  static const String triggerSos = '$baseUrl/safety/sos';

  // Timeout setting
  static const Duration requestTimeout = Duration(seconds: 15);
}
