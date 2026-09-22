import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

// Screens 1 to 24
import 'screens/screen_01_splash.dart';
import 'screens/screen_02_permissions.dart';
import 'screens/screen_03_login.dart';
import 'screens/screen_04_otp.dart';
import 'screens/screen_05_create_profile.dart';
import 'screens/screen_06_home_dashboard.dart';
import 'screens/screen_07_write_task.dart';
import 'screens/screen_08_service_selection.dart';
import 'screens/screen_09_task_details.dart';
import 'screens/screen_10_location.dart';
import 'screens/screen_11_booking_summary.dart';
import 'screens/screen_12_finding_partner.dart';
import 'screens/screen_13_tip_screen.dart';
import 'screens/screen_14_partner_accepted.dart';
import 'screens/screen_15_partner_arrived.dart';
import 'screens/screen_16_work_in_progress.dart';
import 'screens/screen_17_work_completed.dart';
import 'screens/screen_18_rate_partner.dart';
import 'screens/screen_19_orders_tab.dart';
import 'screens/screen_20_order_details.dart';
import 'screens/screen_21_notifications_tab.dart';
import 'screens/screen_22_profile_tab.dart';
import 'screens/screen_23_sos_safety.dart';
import 'screens/screen_24_support_faq.dart';
import 'screens/screen_24_support_faqs.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  runApp(const DoNowCustomerApp());
}

class DoNowCustomerApp extends StatelessWidget {
  const DoNowCustomerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DoNow Customer',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0F766E), // DoNow Primary Teal
          primary: const Color(0xFF0F766E),
          secondary: const Color(0xFF047857),
          surface: Colors.white,
          onSurface: const Color(0xFF0F172A),
        ),
        fontFamily: 'Roboto',
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          scrolledUnderElevation: 1,
          iconTheme: IconThemeData(color: Color(0xFF0F172A)),
          titleTextStyle: TextStyle(
            color: Color(0xFF0F172A),
            fontSize: 18,
            fontWeight: FontWeight.w700,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF0F766E),
            foregroundColor: Colors.white,
            elevation: 0,
            minimumSize: const Size.fromHeight(52),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
            textStyle: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ),
      initialRoute: '/splash',
      routes: {
        // Screen 01 - 08
        '/splash': (context) => const Screen01Splash(),
        '/permissions': (context) => const Screen02Permissions(),
        '/login': (context) => const Screen03Login(),
        '/otp': (context) => const Screen04Otp(),
        '/create-profile': (context) => const Screen05CreateProfile(),
        '/home': (context) => const Screen06HomeDashboard(),
        '/write-task': (context) => const Screen07WriteTask(),
        '/services': (context) => const Screen08ServiceSelection(),

        // Screen 09 - 16
        '/task-details': (context) => const Screen09TaskDetails(),
        '/location': (context) => const Screen10Location(),
        '/booking-summary': (context) => const Screen11BookingSummary(),
        '/finding-partner': (context) => const Screen12FindingPartner(),
        '/tip': (context) => const Screen13TipScreen(),
        '/partner-accepted': (context) => const Screen14PartnerAccepted(),
        '/partner-arrived': (context) => const Screen15PartnerArrived(),
        '/work-in-progress': (context) => const Screen16WorkInProgress(),

        // Screen 17 - 24
        '/work-completed': (context) => const Screen17WorkCompleted(),
        '/rate-partner': (context) => const Screen18RatePartner(),
        '/orders': (context) => const Screen19OrdersTab(),
        '/order-details': (context) => const Screen20OrderDetails(),
        '/notifications': (context) => const Screen21NotificationsTab(),
        '/profile': (context) => const Screen22ProfileTab(),
        '/sos': (context) => const Screen23SosSafety(),
        '/support-faq': (context) => const Screen24SupportFaqs(),
        '/support-faqs': (context) => const Screen24SupportFaqs(),
      },
    );
  }
}
