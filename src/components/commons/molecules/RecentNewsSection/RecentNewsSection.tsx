import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary";
import { useState } from "react";

type RecentNews = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const recentNews1: RecentNews[] = [
  {
    title: "Peresmian Nama",
    description:
      "Angkatan ke-13 Pondok Pesantren Tarbiyatul Huda",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NjI4MTMyNTBfMTgzMzA1NTQzNDEyMzIyNzNfNjgxMzU3Nzg1MDQ3NDMwNTc1OF9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE1ESTBlREV5T0RBdWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1NeUluMCZfbmNfaHQ9c2NvbnRlbnQtZnJhMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDUmX25jX29jPVE2Y1oyUUdQelJhUm1mWnIyRGtfOVJzakVVTDNpU0N4bk5sTEFQVVBjMlE3OVIxLUM5ZF81aU40U2pXRXU1NzFxOTRmMkdialVRSGdIR19qbGVPWnBEVEFIb1gtJl9uY19vaGM9N2V0d2E0WFBvalFRN2tOdndHcWZwOEcmX25jX2dpZD1ESzh3NzhySWM5aFNZRTVhRDZmek13JmVkbT1BTlRLSUlvQkFBQUEmY2NiPTctNSZvaD0wMF9BZmVKOWFFNzUtWkpOb0VCLXk1UWJpV0RFSjh2RGY5aUlwdHROV1liN09DX1pBJm9lPTY4RjI3NDZCJl9uY19zaWQ9ZDg4NWEyIiwiZmlsZW5hbWUiOiJUaHVtYm5haWxfNTYyODEzMjUwXzE4MzMwNTU0MzQxMjMyMjczXzY4MTM1Nzc4NTA0NzQzMDU3NThfbi5qcGciLCJuYmYiOjE3NjAzNDE5MDAsImV4cCI6MTc2MDM0NTUwMCwiaWF0IjoxNzYwMzQxOTAwfQ.wTyJDSLdp366kueyJPob5J6af6bDI8fJU4mLbJTiZek",
    link: "https://www.instagram.com/p/DPtmUKukTQe/?utm_source=ig_web_copy_link&igsh=dzdjMHp4aTVoNTQz",
  },
  {
    title: "Maulid Nabi & Haul ke-2",
    description: "Alm. Ust. Ridwansyah Pengasuh Pondok Pesantren Tarbiyatul Huda",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NjA1ODc1NzlfMTgzMjk4NDczMDEyMzIyNzNfMzE2MzMzMjkxNDc4MzE1NzE0Nl9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE1ESTBlREV5T0RBdWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1NeUluMCZfbmNfaHQ9c2NvbnRlbnQtZnJhMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDUmX25jX29jPVE2Y1oyUUg1M3JUN1RfMGtGRl83WUg0YW8yUmVDTV9pRjFqUnFrai1GWmp4QUxtdlNZN25fTjJLYl9SRmpJOEFTdGxFdHViVVFBaXpwYnhseTRveTJyX2NnT3ZBJl9uY19vaGM9bVJIbDBYUkY0Q0FRN2tOdndGOTZobWUmX25jX2dpZD1RTkZwYm9Iem5fSm8zQkRRX3ppRlFBJmVkbT1BTlRLSUlvQkFBQUEmY2NiPTctNSZvaD0wMF9BZmNVTG1oQS13ZVZoM1IzZV9XcWp0emdTTkY5RDJUQ1pGUnJpZjJ2ZFRRYTh3Jm9lPTY4RjI3QzZEJl9uY19zaWQ9ZDg4NWEyIiwiZmlsZW5hbWUiOiJUaHVtYm5haWxfNTYwNTg3NTc5XzE4MzI5ODQ3MzAxMjMyMjczXzMxNjMzMzI5MTQ3ODMxNTcxNDZfbi5qcGciLCJuYmYiOjE3NjAzNDIwNDQsImV4cCI6MTc2MDM0NTY0NCwiaWF0IjoxNzYwMzQyMDQ0fQ.zQhc64_2AwnoMekFcQGzeSrn8CRsCnL1G6o2Cs02Pm4",
    link: "https://www.instagram.com/p/DPhsJKmgd4I/?utm_source=ig_web_copy_link&igsh=OGxtdjRyeDRyOTcz",
  },
  {
    title: "Silaturahmi & Studi Tiru PM UQI",
    description: "Silaturahmi & Studi Tiru PM UQI Ke Pondok Pesantren Tarbiyatul Huda",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NDUzMzM2NDRfMTgzMjU1NTMyMzAyMzIyNzNfMjU1OTQ3NTE1MDU5MzY3NDkwN19uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE1ESTBlREV5T0RBdWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1NeUluMCZfbmNfaHQ9c2NvbnRlbnQtZnJhMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDUmX25jX29jPVE2Y1oyUUVicTBTQm9zVjBSaHlGMmpScFhsT3NmUTltQkpXR1lWU2tTTUVBNnAzZFdKWUNfQXVyNUpZOUNlWXh3V2RPRGZ5bmdGWVRlNFVTOFFsRFl2VlB2amhkJl9uY19vaGM9Y1JYT1RVU3NpUVFRN2tOdndHQ2xkUzImX25jX2dpZD1HYTdLeDBlamRMREFSY2k4Y2JVWmNBJmVkbT1BTlRLSUlvQkFBQUEmY2NiPTctNSZvaD0wMF9BZmVUTTlYQTltRXZFb25nczlRR1pxYjQ1cU9PZzZJcG5JdW14c19UTmpPVVdnJm9lPTY4RjI3NDMyJl9uY19zaWQ9ZDg4NWEyIiwiZmlsZW5hbWUiOiJUaHVtYm5haWxfNTQ1MzMzNjQ0XzE4MzI1NTUzMjMwMjMyMjczXzI1NTk0NzUxNTA1OTM2NzQ5MDdfbi5qcGciLCJuYmYiOjE3NjAzNDQxNjYsImV4cCI6MTc2MDM0Nzc2NiwiaWF0IjoxNzYwMzQ0MTY2fQ.4sQg4C7oxJzI_WyFyzeP-y-ImCrc_Q6no_1YmTBIoCc",
    link: "https://www.instagram.com/p/DOclzVrEe5w/?utm_source=ig_web_copy_link&igsh=ZXBqOXI2MGZpNG9t",
  },
  {
    title: "Hunting Tourist",
    description: "Annual Tourists Hunting Event",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NTQ0MTYwOTdfMTgzMjgyOTUwNzcyMzIyNzNfNDMxMDQ2MTQyNzU1OTcxNTI1OF9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE1ESTBlREV5T0RBdWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1NeUluMCZfbmNfaHQ9c2NvbnRlbnQtZnJhMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDUmX25jX29jPVE2Y1oyUUZDaDdzbEhzUzJIZElsaHRqeXY0U3R1SGRCYkpqekZ3a0pGSVBUTzlBcW5uN0E0UjdNcW1qUE5XdVNEM0tNZURsclJaNXh6TlRROW9aMTF1VlRhMFFFJl9uY19vaGM9M2xkVzhRNUNjZW9RN2tOdndIYzB0cVAmX25jX2dpZD15SHRMdkk3a3k4emZxdXVtaUFEM0hnJmVkbT1BTlRLSUlvQkFBQUEmY2NiPTctNSZvaD0wMF9BZmRWZDNQOUd3VWhrbDFqMERuNElwZTBuUXRzVkRRRElQaWcteGZ1cy1hVFJBJm9lPTY4RjI2Q0U5Jl9uY19zaWQ9ZDg4NWEyIiwiZmlsZW5hbWUiOiJUaHVtYm5haWxfNTU0NDE2MDk3XzE4MzI4Mjk1MDc3MjMyMjczXzQzMTA0NjE0Mjc1NTk3MTUyNThfbi5qcGciLCJuYmYiOjE3NjAzNDIyNTgsImV4cCI6MTc2MDM0NTg1OCwiaWF0IjoxNzYwMzQyMjU4fQ.FRrwVD1fboe_nuMEpAPEubm5FPlbIZezzbvPuZvZze8",
    link: "https://www.instagram.com/p/DPNAvkDkvjj/?utm_source=ig_web_copy_link&igsh=MW1zeThsbzh6OWxkNg==",
  },
];

const recentNews2: RecentNews[] = [
  {
    title: "Selamat & Sukses Nina Nursakinah",
    description: "Peraih Juara 1 Solo Vokal, Edufest Al-Kahfi 2025",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NDk4MjY2NzhfMTgzMjYzNjU0MjkyMzIyNzNfOTEyNTY4NTU1MzkyMzEyNDkxMF9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE16VXdlREUyT0RndWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1NeUluMCZfbmNfaHQ9c2NvbnRlbnQtZnJhMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDUmX25jX29jPVE2Y1oyUUVwMmNhVFpyTVFhb1U5ajRkZlJULTJLUzRfTVdwVVpfSmU4RVplX29qQjBjNGhxdU93SGFsanluMmEta2JVMWFjNDkwam05MmNuSGdBYkNCZVptUHMzJl9uY19vaGM9NmtqNGp3Wnk4T2dRN2tOdndFWVgxekQmX25jX2dpZD1fWFp5bTlmZ2Y4UXdxcm5SVWhFdXdBJmVkbT1BTlRLSUlvQkFBQUEmY2NiPTctNSZvaD0wMF9BZmZPTmN3WEQ1SXVzNDJMSmp3ZjA0bzFhRXgwTmlrX1hTOW1GMTJQZ0hnMnlRJm9lPTY4RjJBMkQwJl9uY19zaWQ9ZDg4NWEyIiwiZmlsZW5hbWUiOiJUaHVtYm5haWxfNTQ5ODI2Njc4XzE4MzI2MzY1NDI5MjMyMjczXzkxMjU2ODU1NTM5MjMxMjQ5MTBfbi5qcGciLCJuYmYiOjE3NjAzNDQ1NzgsImV4cCI6MTc2MDM0ODE3OCwiaWF0IjoxNzYwMzQ0NTc4fQ.ia2wEMSgZv3vtNHtEqU7v9tby4ZxJw90bBqrxgNW7O8",
    link: "https://www.instagram.com/p/DOsraacEd9f/?utm_source=ig_web_copy_link&igsh=MWdpaTV6bDU2NG44bw==",
  },
  {
    title: "Selamat & Sukses Sekar Dewi Arum",
    description: "Peraih Juara 3 Kaligrafi, Edufest Al-Kahfi 2025",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NTA0OTk2MDVfMTgzMjYzNjUzNzgyMzIyNzNfMzk4MzY2ODkyNzEwODg2NTU3N19uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE16VXdlREUyT0RndWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1NeUluMCZfbmNfaHQ9c2NvbnRlbnQtZnJhMy0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDUmX25jX29jPVE2Y1oyUUd2dzV4NWIzSnU0Nmx0SnZJanZPZXpRM3JyU0xCMzdYd0VKdlNSOVJRWlV1dzBuRU5rMG0wSjJheGRIN1R4Qk9KMXJPNFEyelJLZmlrVVdDVEh5cy05Jl9uY19vaGM9NzVCNmV1aUR1S3NRN2tOdndGWXA5QW8mX25jX2dpZD1vdFNJbzNnV0hWWlEtZW9NdjFIWkFnJmVkbT1BTlRLSUlvQkFBQUEmY2NiPTctNSZvaD0wMF9BZmVFelBseGVmQWpQWXQ0WEZCUXpsUm04bDVsREZYX1dJemdqTUpaamNuWXFnJm9lPTY4RjJBMzYxJl9uY19zaWQ9ZDg4NWEyIiwiZmlsZW5hbWUiOiJUaHVtYm5haWxfNTUwNDk5NjA1XzE4MzI2MzY1Mzc4MjMyMjczXzM5ODM2Njg5MjcxMDg4NjU1Nzdfbi5qcGciLCJuYmYiOjE3NjAzNDQ3NjAsImV4cCI6MTc2MDM0ODM2MCwiaWF0IjoxNzYwMzQ0NzYwfQ.qA7YKQXssJVLxBt8EFtk_oeKHevUl0bP0l3_4VsKslY",
    link: "https://www.instagram.com/p/DOsrPhokYnt/?utm_source=ig_web_copy_link",
  },
  {
    title: "Selamat & Sukses Ilfha Dhea Arum",
    description: "Peraih Juara 3 Kaligrafi, Edufest Al-Kahfi 2025",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NDkyNTYxNThfMTgzMjYzNjUwMDkyMzIyNzNfNTAxMDgzNDkwMDI5NDIyNDE4Nl9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE16VXdlREUyT0RndWMyUnlMbVk0TWpjNE55NWtaV1poZFd4MFgybHRZV2RsTG1WNGNHVnlhVzFsYm5SaGJDSjkmX25jX2h0PXNjb250ZW50LWZyYTMtMS5jZG5pbnN0YWdyYW0uY29tJl9uY19jYXQ9MTA1Jl9uY19vYz1RNmNaMlFIMS0tX1ZxSjhLV3JXbkRpYkpPY2dETFNQb1Jrd0ptWFFCODJhelUzVUNOd0RiT3hmM3A5bkNnUW9NTnlVOGhMdUd5QzE2cGVubmtnb3ZCSVRkWGg2bCZfbmNfb2hjPU9lc3prMzhmY0RvUTdrTnZ3SFlzeVdUJl9uY19naWQ9WnBEbXNSdDFjZWprZlhIckQwTnpBQSZlZG09QU5US0lJb0JBQUFBJmNjYj03LTUmb2g9MDBfQWZkZkREVnhUQXAtZE9CLWs3U2VCazdBbk1WdWhPRWR4akdQOHVYc0o5MlR0ZyZvZT02OEYyN0FDQyZfbmNfc2lkPWQ4ODVhMiIsImZpbGVuYW1lIjoiVGh1bWJuYWlsXzU0OTI1NjE1OF8xODMyNjM2NTAwOTIzMjI3M181MDEwODM0OTAwMjk0MjI0MTg2X24uanBnIiwibmJmIjoxNzYwMzQ0ODI3LCJleHAiOjE3NjAzNDg0MjcsImlhdCI6MTc2MDM0NDgyN30.r3BkG9zzROnDNvPV8vqstABhn4J_83TPe-lE1lb3ob4",
    link: "https://www.instagram.com/p/DOsq-Z1Ecx3/?utm_source=ig_web_copy_link&igsh=MWp5NGMyZXNzc3V2eQ==",
  },
  {
    title: "Selamat & Sukses Habibullah Az-Zibri",
    description: "Penerima Beasiswa Universitas Al-Azhar, Kairo, Mesir",
    image:
      "https://i.snapcdn.app/photo?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS81NDUwMTU3NTRfMTgzMjU1NTAyMDAyMzIyNzNfNDU1ODEwNTc5NTY1OTk4ODc1X24uanBnP3N0cD1kc3QtanBnX2UzNV9wNjQweDY0MF9zaDAuMDhfdHQ2JmVmZz1leUoyWlc1amIyUmxYM1JoWnlJNkltbHRZV2RsWDNWeWJHZGxiaTR4TURnd2VERXpOVEF1YzJSeUxtWTRNamM0Tnk1a1pXWmhkV3gwWDJsdFlXZGxMbU15SW4wJl9uY19odD1zY29udGVudC1mcmEzLTEuY2RuaW5zdGFncmFtLmNvbSZfbmNfY2F0PTEwNSZfbmNfb2M9UTZjWjJRR0huSnNMQzhScWtpY0xkd1BnekF5VDZ0VjhoV3RSUUtNWnRBV3VmMXoxaTlJUjVqbkpDbXVOdkJDcVlZVDRPemZzTlB5ZDVpXzZpX2lTa3cycmZIWjMmX25jX29oYz1pUGFNTU9hOTRhY1E3a052d0g3cFJ1aSZfbmNfZ2lkPVNYdHFNRE85VUN6dUJxNWc4QVFoS3cmZWRtPUFOVEtJSW9CQUFBQSZjY2I9Ny01Jm9oPTAwX0FmZFJOd28wWVRhRHZMdF9DRklmSVZaQ0pBUjJoNHhRY3A1OG1ENlpjeE9BMVEmb2U9NjhGMjlDQjYmX25jX3NpZD1kODg1YTIiLCJmaWxlbmFtZSI6IlRodW1ibmFpbF81NDUwMTU3NTRfMTgzMjU1NTAyMDAyMzIyNzNfNDU1ODEwNTc5NTY1OTk4ODc1X24uanBnIiwibmJmIjoxNzYwMzQ0OTU0LCJleHAiOjE3NjAzNDg1NTQsImlhdCI6MTc2MDM0NDk1NH0.YldEA-sENPhNXqY268j5VnJXIA4DpNW6H6uTrtWxicY",
    link: "https://www.instagram.com/p/DOcgq1akaQo/?utm_source=ig_web_copy_link&igsh=MTQycHFyZGMyOGowOA==",
  },
];

const RecentNewsSection = () => {
  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setShowMore(!showMore);
  }

  return (
    <section className="lg:py-10" id="news">
      <div className="p-5 max-w-5xl m-auto lg:px-0">
        <h3 className="flex items-center justify-center gap-5 mb-3">
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
          <span className="text-[var(--color-text-muted)] font-bold">
            Postingan Terkini
          </span>
          <div className="h-px bg-[var(--color-text-muted)] w-10"></div>
        </h3>
        <div className="grid grid-cols-2 lg:gap-10 items-center">
          <ul
            className={`${
              showMore ? "flex flex-col gap-3 col-span-2 lg:mb-0 lg:col-span-1" : "flex flex-col gap-3 mb-5 col-span-2 lg:col-span-1 lg:mb-0"
            }`}
          >
            {recentNews1.map((item, index) => (
              <li
                key={index}
                className="p-5 border-b-1 border-[var(--color-border)]"
              >
                <a
                  href={item.link}
                  target="_blank"
                  className="group flex gap-5 items-center"
                >
                  <div className={`${item.image ? "size-20 bg-[var(--color-surface)] rounded-md animate-none overflow-hidden" : "size-20 bg-[var(--color-surface)] rounded-md animate-pulse overflow-hidden"}`}>
                    <img src={item.image} alt="" className="object-cover w-full h-full object-center" />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="group-hover:after:w-full font-bold text-xl text-[var(--color-gold)] relative w-fit after:absolute after:w-0 after:h-px after:bg-[var(--color-gold)] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
                      {item.title}
                    </h1>
                    <p className="text-xs text-[var(--color-text-muted)] font-light">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <ul
            className={`${
              showMore
                ? "flex flex-col gap-3 mb-5 col-span-2 lg:col-span-1 lg:mb-0"
                : "hidden lg:flex lg:flex-col lg:gap-3"
            }`}
          >
            {recentNews2.map((item, index) => (
              <li
                key={index}
                className="p-5 border-b-1 border-[var(--color-border)]"
              >
                <a
                  href={item.link}
                  target="_blank"
                  className="group flex gap-5 items-center"
                >
                  <div className={`${item.image ? "size-20 bg-[var(--color-surface)] rounded-md animate-none overflow-hidden" : "size-20 bg-[var(--color-surface)] rounded-md animate-pulse overflow-hidden"}`}>
                    <img src={item.image} alt="" className="object-cover w-full h-full object-center" />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="group-hover:after:w-full font-bold text-xl text-[var(--color-gold)] relative w-fit after:absolute after:w-0 after:h-px after:bg-[var(--color-gold)] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
                      {item.title}
                    </h1>
                    <p className="text-xs text-[var(--color-text-muted)] font-light">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden">
          <ButtonSecondary value="Lihat Lebih Banyak" onClick={handleClick} />
        </div>
      </div>
    </section>
  );
};

export default RecentNewsSection;
