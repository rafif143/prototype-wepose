import { TemplateType, Language, SponsorFormData } from './types';

interface LetterContent {
  title: string;
  body: string;
}

export function getLetterBody(
  template: TemplateType,
  language: Language,
  formData: SponsorFormData
): LetterContent {
  switch (language) {
    case 'id':
      return getIndonesianLetter(template, formData);
    case 'en':
      return getEnglishLetter(template, formData);
    case 'zh':
      return getChineseLetter(template, formData);
    case 'ja':
      return getJapaneseLetter(template, formData);
    case 'th':
      return getThaiLetter(template, formData);
    case 'ru':
      return getRussianLetter(template, formData);
    case 'de':
      return getGermanLetter(template, formData);
    case 'fr':
      return getFrenchLetter(template, formData);
    case 'ar':
      return getArabicLetter(template, formData);
    default:
      return getEnglishLetter(template, formData);
  }
}

function getIndonesianLetter(
  template: TemplateType,
  formData: SponsorFormData
): LetterContent {
  const {
    applicantName,
    passportNumber,
    birthDate,
    destinationCountry,
    destinationCity,
    departureDate,
    returnDate,
    sponsorName,
    sponsorIdNumber,
    sponsorAddress,
    sponsorPhone,
    relationship,
    companyName,
    position,
    letterNumber,
    signerName,
    signerPosition,
    occupation,
    monthlyIncome,
  } = formData;

  if (template === 'keluarga') {
    return {
      title: 'SURAT SPONSOR KELUARGA',
      body: `Yang bertanda tangan di bawah ini:

Nama: ${sponsorName || '[Nama Sponsor]'}
No. KTP: ${sponsorIdNumber || '[No. KTP]'}
Alamat: ${sponsorAddress || '[Alamat Lengkap]'}
No. Telepon: ${sponsorPhone || '[No. Telepon]'}

Dengan ini menyatakan bahwa saya bersedia menjadi sponsor dan menanggung seluruh biaya perjalanan untuk:

Nama: ${applicantName || '[Nama Pemohon]'}
No. Paspor: ${passportNumber || '[No. Paspor]'}
Tanggal Lahir: ${birthDate || '[Tanggal Lahir]'}
Hubungan: ${relationship || '[Hubungan]'}

Yang akan melakukan perjalanan ke ${destinationCity || '[Kota Tujuan]'}, ${destinationCountry || '[Negara Tujuan]'} pada tanggal ${departureDate || '[Tanggal Berangkat]'} hingga ${returnDate || '[Tanggal Kembali]'}.

Saya menjamin bahwa pemohon akan kembali ke Indonesia setelah masa kunjungan berakhir dan akan mematuhi semua peraturan yang berlaku di negara tujuan.

Demikian surat sponsor ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.`,
    };
  }

  if (template === 'perusahaan') {
    return {
      title: 'SURAT SPONSOR PERUSAHAAN',
      body: `${letterNumber || '[No. Surat]'}

Kepada Yth.
Kedutaan Besar ${destinationCountry || '[Negara Tujuan]'}
Di tempat

Perihal: Surat Sponsor Perjalanan Dinas

Dengan hormat,

Yang bertanda tangan di bawah ini:

Nama: ${signerName || '[Nama Penandatangan]'}
Jabatan: ${signerPosition || '[Jabatan]'}
Perusahaan: ${companyName || '[Nama Perusahaan]'}

Dengan ini menyatakan bahwa:

Nama: ${applicantName || '[Nama Karyawan]'}
No. Paspor: ${passportNumber || '[No. Paspor]'}
Jabatan: ${position || '[Jabatan Karyawan]'}

Adalah karyawan tetap di perusahaan kami dan akan melakukan perjalanan dinas ke ${destinationCity || '[Kota Tujuan]'}, ${destinationCountry || '[Negara Tujuan]'} pada tanggal ${departureDate || '[Tanggal Berangkat]'} hingga ${returnDate || '[Tanggal Kembali]'}.

Perusahaan kami akan menanggung seluruh biaya perjalanan dinas yang bersangkutan dan menjamin bahwa yang bersangkutan akan kembali ke Indonesia setelah perjalanan dinas selesai.

Demikian surat sponsor ini kami buat untuk dapat dipergunakan sebagaimana mestinya.

Hormat kami,`,
    };
  }

  // pribadi
  return {
    title: 'SURAT PERNYATAAN SPONSOR PRIBADI',
    body: `Yang bertanda tangan di bawah ini:

Nama: ${applicantName || '[Nama Lengkap]'}
No. Paspor: ${passportNumber || '[No. Paspor]'}
Tanggal Lahir: ${birthDate || '[Tanggal Lahir]'}
Pekerjaan: ${occupation || '[Pekerjaan]'}
Penghasilan per Bulan: ${monthlyIncome || '[Penghasilan]'}

Dengan ini menyatakan bahwa saya akan melakukan perjalanan ke ${destinationCity || '[Kota Tujuan]'}, ${destinationCountry || '[Negara Tujuan]'} pada tanggal ${departureDate || '[Tanggal Berangkat]'} hingga ${returnDate || '[Tanggal Kembali]'}.

Saya menyatakan bahwa:
1. Saya akan membiayai sendiri seluruh biaya perjalanan ini
2. Saya memiliki kemampuan finansial yang cukup untuk membiayai perjalanan
3. Saya akan kembali ke Indonesia setelah masa kunjungan berakhir
4. Saya akan mematuhi semua peraturan yang berlaku di negara tujuan

Demikian surat pernyataan ini saya buat dengan sebenarnya dan penuh tanggung jawab.`,
  };
}

function getEnglishLetter(
  template: TemplateType,
  formData: SponsorFormData
): LetterContent {
  const {
    applicantName,
    passportNumber,
    birthDate,
    destinationCountry,
    destinationCity,
    departureDate,
    returnDate,
    sponsorName,
    sponsorIdNumber,
    sponsorAddress,
    sponsorPhone,
    relationship,
    companyName,
    position,
    letterNumber,
    signerName,
    signerPosition,
    occupation,
    monthlyIncome,
  } = formData;

  if (template === 'keluarga') {
    return {
      title: 'FAMILY SPONSORSHIP LETTER',
      body: `I, the undersigned:

Name: ${sponsorName || '[Sponsor Name]'}
ID Number: ${sponsorIdNumber || '[ID Number]'}
Address: ${sponsorAddress || '[Full Address]'}
Phone Number: ${sponsorPhone || '[Phone Number]'}

Hereby declare that I am willing to sponsor and bear all travel expenses for:

Name: ${applicantName || '[Applicant Name]'}
Passport Number: ${passportNumber || '[Passport Number]'}
Date of Birth: ${birthDate || '[Date of Birth]'}
Relationship: ${relationship || '[Relationship]'}

Who will be traveling to ${destinationCity || '[Destination City]'}, ${destinationCountry || '[Destination Country]'} from ${departureDate || '[Departure Date]'} to ${returnDate || '[Return Date]'}.

I guarantee that the applicant will return to Indonesia after the visit period ends and will comply with all applicable regulations in the destination country.

This sponsorship letter is made truthfully and can be used as necessary.`,
    };
  }

  if (template === 'perusahaan') {
    return {
      title: 'COMPANY SPONSORSHIP LETTER',
      body: `${letterNumber || '[Letter Number]'}

To:
Embassy of ${destinationCountry || '[Destination Country]'}

Subject: Business Travel Sponsorship Letter

Dear Sir/Madam,

I, the undersigned:

Name: ${signerName || '[Signer Name]'}
Position: ${signerPosition || '[Position]'}
Company: ${companyName || '[Company Name]'}

Hereby certify that:

Name: ${applicantName || '[Employee Name]'}
Passport Number: ${passportNumber || '[Passport Number]'}
Position: ${position || '[Employee Position]'}

Is a permanent employee of our company and will be traveling on business to ${destinationCity || '[Destination City]'}, ${destinationCountry || '[Destination Country]'} from ${departureDate || '[Departure Date]'} to ${returnDate || '[Return Date]'}.

Our company will bear all business travel expenses for the concerned person and guarantee that the person will return to Indonesia after the business trip is completed.

This sponsorship letter is made for official use.

Sincerely,`,
    };
  }

  // pribadi
  return {
    title: 'SELF-SPONSORSHIP DECLARATION LETTER',
    body: `I, the undersigned:

Name: ${applicantName || '[Full Name]'}
Passport Number: ${passportNumber || '[Passport Number]'}
Date of Birth: ${birthDate || '[Date of Birth]'}
Occupation: ${occupation || '[Occupation]'}
Monthly Income: ${monthlyIncome || '[Monthly Income]'}

Hereby declare that I will be traveling to ${destinationCity || '[Destination City]'}, ${destinationCountry || '[Destination Country]'} from ${departureDate || '[Departure Date]'} to ${returnDate || '[Return Date]'}.

I hereby declare that:
1. I will finance all travel expenses myself
2. I have sufficient financial capability to finance this trip
3. I will return to Indonesia after the visit period ends
4. I will comply with all applicable regulations in the destination country

This declaration letter is made truthfully and with full responsibility.`,
  };
}

function getChineseLetter(
  template: TemplateType,
  formData: SponsorFormData
): LetterContent {
  const {
    applicantName,
    passportNumber,
    birthDate,
    destinationCountry,
    destinationCity,
    departureDate,
    returnDate,
    sponsorName,
    sponsorIdNumber,
    sponsorAddress,
    sponsorPhone,
    relationship,
  } = formData;

  if (template === 'keluarga') {
    return {
      title: '家庭担保信',
      body: `本人：

姓名：${sponsorName || '[担保人姓名]'}
身份证号：${sponsorIdNumber || '[身份证号]'}
地址：${sponsorAddress || '[完整地址]'}
电话：${sponsorPhone || '[电话号码]'}

特此声明，本人愿意担保并承担以下人员的全部旅行费用：

姓名：${applicantName || '[申请人姓名]'}
护照号码：${passportNumber || '[护照号码]'}
出生日期：${birthDate || '[出生日期]'}
关系：${relationship || '[关系]'}

该人员将于${departureDate || '[出发日期]'}至${returnDate || '[返回日期]'}期间前往${destinationCountry || '[目的地国家]'}${destinationCity || '[目的地城市]'}旅行。

本人保证申请人将在访问期结束后返回印度尼西亚，并遵守目的地国家的所有适用法规。

特此出具担保信，以供相关用途使用。`,
    };
  }

  return {
    title: '个人担保声明书',
    body: `本人：

姓名：${applicantName || '[姓名]'}
护照号码：${passportNumber || '[护照号码]'}
出生日期：${birthDate || '[出生日期]'}

特此声明本人将于${departureDate || '[出发日期]'}至${returnDate || '[返回日期]'}期间前往${destinationCountry || '[目的地国家]'}${destinationCity || '[目的地城市]'}旅行。

本人声明：
1. 本人将自行承担此次旅行的全部费用
2. 本人具有足够的经济能力承担此次旅行费用
3. 本人将在访问期结束后返回印度尼西亚
4. 本人将遵守目的地国家的所有适用法规

特此声明，本人对此承担全部责任。`,
  };
}

function getJapaneseLetter(
  template: TemplateType,
  formData: SponsorFormData
): LetterContent {
  const {
    applicantName,
    passportNumber,
    birthDate,
    destinationCountry,
    destinationCity,
    departureDate,
    returnDate,
    sponsorName,
    sponsorIdNumber,
    sponsorAddress,
    sponsorPhone,
    relationship,
  } = formData;

  if (template === 'keluarga') {
    return {
      title: '家族身元保証書',
      body: `下記署名者：

氏名：${sponsorName || '[保証人氏名]'}
身分証明書番号：${sponsorIdNumber || '[身分証明書番号]'}
住所：${sponsorAddress || '[住所]'}
電話番号：${sponsorPhone || '[電話番号]'}

ここに、以下の者の全ての旅行費用を保証し、負担することを宣言いたします：

氏名：${applicantName || '[申請者氏名]'}
パスポート番号：${passportNumber || '[パスポート番号]'}
生年月日：${birthDate || '[生年月日]'}
続柄：${relationship || '[続柄]'}

上記の者は${departureDate || '[出発日]'}から${returnDate || '[帰国日]'}まで${destinationCountry || '[渡航先国]'}${destinationCity || '[渡航先都市]'}へ旅行いたします。

申請者は訪問期間終了後にインドネシアに帰国し、渡航先国のすべての適用法規を遵守することを保証いたします。

この身元保証書は真実に基づいて作成され、必要に応じて使用されるものです。`,
    };
  }

  return {
    title: '個人保証宣言書',
    body: `下記署名者：

氏名：${applicantName || '[氏名]'}
パスポート番号：${passportNumber || '[パスポート番号]'}
生年月日：${birthDate || '[生年月日]'}

ここに、${departureDate || '[出発日]'}から${returnDate || '[帰国日]'}まで${destinationCountry || '[渡航先国]'}${destinationCity || '[渡航先都市]'}へ旅行することを宣言いたします。

私は以下のことを宣言いたします：
1. この旅行のすべての費用を自己負担いたします
2. この旅行を賄う十分な経済力を有しています
3. 訪問期間終了後にインドネシアに帰国いたします
4. 渡航先国のすべての適用法規を遵守いたします

この宣言書は真実に基づいて作成され、全責任を負うものです。`,
  };
}

function getThaiLetter(
  template: TemplateType,
  formData: SponsorFormData
): LetterContent {
  const {
    applicantName,
    passportNumber,
    birthDate,
    destinationCountry,
    destinationCity,
    departureDate,
    returnDate,
    sponsorName,
    sponsorIdNumber,
    sponsorAddress,
    sponsorPhone,
    relationship,
  } = formData;

  if (template === 'keluarga') {
    return {
      title: 'หนังสือค้ำประกันครอบครัว',
      body: `ข้าพเจ้าผู้ลงนามด้านล่าง:

ชื่อ: ${sponsorName || '[ชื่อผู้ค้ำประกัน]'}
เลขบัตรประชาชน: ${sponsorIdNumber || '[เลขบัตรประชาชน]'}
ที่อยู่: ${sponsorAddress || '[ที่อยู่เต็ม]'}
เบอร์โทรศัพท์: ${sponsorPhone || '[เบอร์โทรศัพท์]'}

ขอแสดงเจตนาว่าข้าพเจ้ายินดีที่จะเป็นผู้ค้ำประกันและรับผิดชอบค่าใช้จ่ายในการเดินทางทั้งหมดสำหรับ:

ชื่อ: ${applicantName || '[ชื่อผู้สมัคร]'}
หมายเลขหนังสือเดินทาง: ${passportNumber || '[หมายเลขหนังสือเดินทาง]'}
วันเกิด: ${birthDate || '[วันเกิด]'}
ความสัมพันธ์: ${relationship || '[ความสัมพันธ์]'}

ผู้ที่จะเดินทางไป${destinationCity || '[เมืองปลายทาง]'} ประเทศ${destinationCountry || '[ประเทศปลายทาง]'} ตั้งแต่วันที่ ${departureDate || '[วันที่เดินทาง]'} ถึงวันที่ ${returnDate || '[วันที่กลับ]'}

ข้าพเจ้าขอรับรองว่าผู้สมัครจะกลับมายังประเทศอินโดนีเซียหลังจากระยะเวลาการเยือนสิ้นสุดลง และจะปฏิบัติตามกฎระเบียบทั้งหมดที่ใช้บังคับในประเทศปลายทาง

หนังสือค้ำประกันฉบับนี้จัดทำขึ้นด้วยความจริงใจและสามารถใช้ได้ตามความจำเป็น`,
    };
  }

  return {
    title: 'หนังสือแสดงเจตนาค้ำประกันตนเอง',
    body: `ข้าพเจ้าผู้ลงนามด้านล่าง:

ชื่อ: ${applicantName || '[ชื่อเต็ม]'}
หมายเลขหนังสือเดินทาง: ${passportNumber || '[หมายเลขหนังสือเดินทาง]'}
วันเกิด: ${birthDate || '[วันเกิด]'}

ขอแสดงเจตนาว่าข้าพเจ้าจะเดินทางไป${destinationCity || '[เมืองปลายทาง]'} ประเทศ${destinationCountry || '[ประเทศปลายทาง]'} ตั้งแต่วันที่ ${departureDate || '[วันที่เดินทาง]'} ถึงวันที่ ${returnDate || '[วันที่กลับ]'}

ข้าพเจ้าขอแสดงเจตนาว่า:
1. ข้าพเจ้าจะเป็นผู้รับผิดชอบค่าใช้จ่ายในการเดินทางครั้งนี้ทั้งหมดด้วยตนเอง
2. ข้าพเจ้ามีความสามารถทางการเงินเพียงพอที่จะรับผิดชอบค่าใช้จ่ายในการเดินทางครั้งนี้
3. ข้าพเจ้าจะกลับมายังประเทศอินโดนีเซียหลังจากระยะเวลาการเยือนสิ้นสุดลง
4. ข้าพเจ้าจะปฏิบัติตามกฎระเบียบทั้งหมดที่ใช้บังคับในประเทศปลายทาง

หนังสือแสดงเจตนาฉบับนี้จัดทำขึ้นด้วยความจริงใจและความรับผิดชอบเต็มที่`,
  };
}

// Placeholder functions for other languages (can be expanded later)
function getRussianLetter(template: TemplateType, formData: SponsorFormData): LetterContent {
  return {
    title: 'ПИСЬМО-ПОРУЧИТЕЛЬСТВО',
    body: 'Содержание письма на русском языке будет добавлено позже.',
  };
}

function getGermanLetter(template: TemplateType, formData: SponsorFormData): LetterContent {
  return {
    title: 'BÜRGSCHAFTSERKLÄRUNG',
    body: 'Der Inhalt des Briefes auf Deutsch wird später hinzugefügt.',
  };
}

function getFrenchLetter(template: TemplateType, formData: SponsorFormData): LetterContent {
  return {
    title: 'LETTRE DE PARRAINAGE',
    body: 'Le contenu de la lettre en français sera ajouté ultérieurement.',
  };
}

function getArabicLetter(template: TemplateType, formData: SponsorFormData): LetterContent {
  return {
    title: 'خطاب الكفالة',
    body: 'سيتم إضافة محتوى الرسالة باللغة العربية لاحقاً.',
  };
}