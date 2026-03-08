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
  if (language === 'id') {
    return getIndonesianLetter(template, formData);
  }
  return getEnglishLetter(template, formData);
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
