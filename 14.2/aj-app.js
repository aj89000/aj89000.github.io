(() => {
  const title = document.getElementById('auto-title');
  const description = document.getElementById('auto-description');
  const state = document.getElementById('auto-state');
  const progress = document.getElementById('auto-progress');
  const deviceInfo = document.getElementById('device-info');

  // This is a visual startup preview only; no firmware exploit is executed here.
  const ua = navigator.userAgent || '';
  const isPS4 = /PlayStation 4/i.test(ua);
  const firmwareMatch = ua.match(/PlayStation 4\s*([0-9]+(?:\.[0-9]+)?)/i);

  const stages = [
    { percent: 24, title: 'بدء التهيئة التلقائية', description: 'يتم تجهيز واجهة AJ وفحص بيئة التشغيل...', state: 'STARTING' },
    { percent: 58, title: 'فحص بيئة الجهاز', description: 'يتم التحقق من نوع الجهاز والمتصفح تلقائياً...', state: 'SCANNING' },
    { percent: 86, title: 'تحديد مسار النظام', description: 'واجهة التشغيل التلقائي جاهزة لربط مسار الإصدار المناسب...', state: 'DETECTING' },
    { percent: 100, title: 'اكتملت تهيئة الواجهة', description: 'المعاينة جاهزة. لم يتم تشغيل أو تنفيذ أي تفعيل بعد.', state: 'READY' }
  ];

  if (isPS4) {
    deviceInfo.textContent = firmwareMatch
      ? `DEVICE: PS4 · ${firmwareMatch[1]}`
      : 'DEVICE: PLAYSTATION 4';
  } else {
    deviceInfo.textContent = 'DEVICE: PC PREVIEW';
  }

  let index = 0;
  const showStage = () => {
    const stage = stages[index];
    title.textContent = stage.title;
    description.textContent = stage.description;
    state.textContent = stage.state;
    progress.style.width = `${stage.percent}%`;
    index += 1;
    if (index < stages.length) window.setTimeout(showStage, 950);
  };

  showStage();
})();
