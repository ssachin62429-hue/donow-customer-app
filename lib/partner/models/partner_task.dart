// File: lib/partner/models/partner_task.dart

enum PartnerDutyStatus { offline, online, busy }

enum PartnerTaskStatus {
  radar,
  accepted,
  arrived,
  inProgress,
  completed,
  settled
}

class PartnerTask {
  final String id;
  final String customerName;
  final String customerPhone;
  final String serviceName;
  final String address;
  final String landmark;
  final String meetingNotes;
  final double distanceKm;
  final double ratePerMin;
  final int minFloorMinutes;
  final String securityPin;
  PartnerTaskStatus status;
  int elapsedMinutes;
  double tipAmount;

  PartnerTask({
    required this.id,
    required this.customerName,
    required this.customerPhone,
    required this.serviceName,
    required this.address,
    required this.landmark,
    required this.meetingNotes,
    required this.distanceKm,
    this.ratePerMin = 2.00,
    this.minFloorMinutes = 30,
    required this.securityPin,
    this.status = PartnerTaskStatus.radar,
    this.elapsedMinutes = 0,
    this.tipAmount = 40.00,
  });

  int get billableMinutes =>
      elapsedMinutes < minFloorMinutes ? minFloorMinutes : elapsedMinutes;

  double get serviceFare => billableMinutes * ratePerMin;

  double get totalPayable => serviceFare + tipAmount;
}
