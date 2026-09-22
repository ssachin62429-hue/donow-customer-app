// File: lib/partner/services/partner_state_service.dart
import 'dart:async';
import 'package:flutter/material.dart';
import '../models/partner_task.dart';

class PartnerStateService extends ChangeNotifier {
  static final PartnerStateService _instance = PartnerStateService._internal();
  factory PartnerStateService() => _instance;
  PartnerStateService._internal();

  // Partner Identity
  final String partnerName = 'Rahul Sharma';
  final String partnerPhone = '+91 98765 43210';
  final String partnerId = 'DN-P-4819';
  final double rating = 4.85;
  final int totalJobsDone = 142;

  // Duty Status
  PartnerDutyStatus dutyStatus = PartnerDutyStatus.online;

  // Today's Metrics
  double todayEarnings = 840.0;
  int todayCompletedTasks = 4;
  double todayHoursOnline = 4.5;
  int acceptanceRate = 98;

  // Active Task
  PartnerTask? currentTask;
  Timer? _stopwatchTimer;
  int liveElapsedSeconds = 0;

  void toggleDuty() {
    if (dutyStatus == PartnerDutyStatus.online) {
      dutyStatus = PartnerDutyStatus.offline;
    } else {
      dutyStatus = PartnerDutyStatus.online;
    }
    notifyListeners();
  }

  void receiveNewTask({
    String orderId = 'DN-89210',
    String customerName = 'Amit Verma',
    String serviceName = 'Govt Office & Queue Waiting',
    String landmark = 'Hazratganj GPO, Counter 4 Gate',
    String securityPin = '7482',
  }) {
    currentTask = PartnerTask(
      id: orderId,
      customerName: customerName,
      customerPhone: '+91 94520 12345',
      serviceName: serviceName,
      address: 'General Post Office, Hazratganj, Lucknow',
      landmark: landmark,
      meetingNotes: 'Blue shirt, holding Aadhaar form documents',
      distanceKm: 1.2,
      ratePerMin: 2.00,
      minFloorMinutes: 30,
      securityPin: securityPin,
      status: PartnerTaskStatus.radar,
    );
    notifyListeners();
  }

  void acceptTask() {
    if (currentTask != null) {
      currentTask!.status = PartnerTaskStatus.accepted;
      notifyListeners();
    }
  }

  void markArrived() {
    if (currentTask != null) {
      currentTask!.status = PartnerTaskStatus.arrived;
      notifyListeners();
    }
  }

  bool verifyPinAndStartMeter(String enteredPin) {
    if (currentTask != null && currentTask!.securityPin == enteredPin) {
      currentTask!.status = PartnerTaskStatus.inProgress;
      liveElapsedSeconds = 0;
      _startMeterTimer();
      notifyListeners();
      return true;
    }
    return false;
  }

  void _startMeterTimer() {
    _stopwatchTimer?.cancel();
    _stopwatchTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      liveElapsedSeconds++;
      if (currentTask != null) {
        currentTask!.elapsedMinutes = (liveElapsedSeconds / 60).ceil();
      }
      notifyListeners();
    });
  }

  void completeTask() {
    _stopwatchTimer?.cancel();
    if (currentTask != null) {
      currentTask!.status = PartnerTaskStatus.completed;
      if (currentTask!.elapsedMinutes < 30) {
        currentTask!.elapsedMinutes = 30; // 30 min minimum
      }
      notifyListeners();
    }
  }

  void confirmPaymentSettled() {
    if (currentTask != null) {
      todayEarnings += currentTask!.totalPayable;
      todayCompletedTasks += 1;
      currentTask!.status = PartnerTaskStatus.settled;
      currentTask = null;
      liveElapsedSeconds = 0;
      notifyListeners();
    }
  }
}
