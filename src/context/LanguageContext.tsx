'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type LanguageCode = 'EN' | 'TH' | 'KO' | 'PT' | 'JA';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  locale: string;
}

export const languages: LanguageOption[] = [
  { code: 'EN', name: 'English', locale: 'en' },
  { code: 'TH', name: 'ไทย', locale: 'th' },
  { code: 'KO', name: '한국어', locale: 'ko' },
  { code: 'PT', name: 'Português', locale: 'pt' },
  { code: 'JA', name: '日本語', locale: 'ja' },
];

export const dictionary: Record<string, Record<LanguageCode, string>> = {
  // Navigation
  'For Surgeons': {
    EN: 'For Surgeons',
    TH: 'สำหรับศัลยแพทย์',
    KO: '의사용',
    PT: 'Para Cirurgiões',
    JA: '外科医向け',
  },
  'FOR SURGEONS': {
    EN: 'FOR SURGEONS',
    TH: 'สำหรับศัลยแพทย์',
    KO: '의사용',
    PT: 'PARA CIRURGIÕES',
    JA: '外科医向け',
  },
  'For Patients': {
    EN: 'For Patients',
    TH: 'สำหรับคนไข้',
    KO: '환자용',
    PT: 'Para Pacientes',
    JA: '患者向け',
  },
  'FOR PATIENTS': {
    EN: 'FOR PATIENTS',
    TH: 'สำหรับคนไข้',
    KO: '환자용',
    PT: 'PARA PACIENTES',
    JA: '患者向け',
  },
  'Procedures': {
    EN: 'Procedures',
    TH: 'หัตถการ',
    KO: '시술 항목',
    PT: 'Procedimentos',
    JA: '施術メニュー',
  },
  'Procedure Guides': {
    EN: 'Procedure Guides',
    TH: 'คู่มือหัตถการ',
    KO: '시술 가이드',
    PT: 'Guias de Procedimentos',
    JA: '施術ガイド',
  },
  'Technology': {
    EN: 'Technology',
    TH: 'เทคโนโลยี',
    KO: '기술',
    PT: 'Tecnologia',
    JA: 'テクノロジー',
  },
  'About': {
    EN: 'About',
    TH: 'เกี่ยวกับเรา',
    KO: '소개',
    PT: 'Sobre',
    JA: '概要',
  },
  'Overview': {
    EN: 'Overview',
    TH: 'ภาพรวม',
    KO: '개요',
    PT: 'Visão Geral',
    JA: '概要',
  },
  'Use Cases': {
    EN: 'Use Cases',
    TH: 'กรณีการใช้งาน',
    KO: '활용 사례',
    PT: 'Casos de Uso',
    JA: '導入事例',
  },
  'Pricing': {
    EN: 'Pricing',
    TH: 'ราคา',
    KO: '가격 안내',
    PT: 'Preços',
    JA: '料金プラン',
  },
  'Partner Program': {
    EN: 'Partner Program',
    TH: 'โปรแกรมพันธมิตร',
    KO: '파트너 프로그램',
    PT: 'Programa de Parceiros',
    JA: 'パートナープログラム',
  },
  'Our Story': {
    EN: 'Our Story',
    TH: 'เรื่องราวของเรา',
    KO: '브랜드 스토리',
    PT: 'Nossa História',
    JA: '開発ストーリー',
  },
  'Trust & Privacy': {
    EN: 'Trust & Privacy',
    TH: 'ความน่าเชื่อถือและความเป็นส่วนตัว',
    KO: '신뢰 및 개인정보 보호',
    PT: 'Confiança e Privacidade',
    JA: '信頼とプライバシー',
  },
  'Surgeon Directory': {
    EN: 'Surgeon Directory',
    TH: 'ไดเรกทอรีศัลยแพทย์',
    KO: '의사 디렉토리',
    PT: 'Diretório de Cirurgiões',
    JA: '認定医リスト',
  },
  'Sign In': {
    EN: 'Sign In',
    TH: 'เข้าสู่ระบบ',
    KO: '로그인',
    PT: 'Entrar',
    JA: 'ログイン',
  },
  'Try Your Face': {
    EN: 'Try Your Face',
    TH: 'จำลองใบหน้าของคุณ',
    KO: '내 얼굴로 시뮬레이션',
    PT: 'Experimente no Seu Rosto',
    JA: '顔でシミュレーション',
  },
  'Language': {
    EN: 'Language',
    TH: 'ภาษา',
    KO: '언어',
    PT: 'Idioma',
    JA: '言語',
  },

  // Hero Section
  '85+ Surgical Simulators': {
    EN: '85+ Surgical Simulators',
    TH: '85+ เครื่องจำลองศัลยกรรม',
    KO: '85개 이상의 수술 시뮬레이터',
    PT: 'Mais de 85 Simuladores Cirúrgicos',
    JA: '85以上の手術シミュレーター',
  },
  'Show the result': {
    EN: 'Show the result',
    TH: 'แสดงผลลัพธ์ล่วงหน้า',
    KO: '결과를 먼저 확인하세요',
    PT: 'Mostre o resultado',
    JA: '施術結果をその場で提示',
  },
  'before the consult ends.': {
    EN: 'before the consult ends.',
    TH: 'ก่อนจบการให้คำปรึกษา',
    KO: '상담이 끝나기 전에.',
    PT: 'antes da consulta terminar.',
    JA: 'カウンセリング終了前に。',
  },
  'Browser-native 3D facial simulation across 85+ aesthetic procedures. Real-time inference executes on-device with zero cloud photo uploads.': {
    EN: 'Browser-native 3D facial simulation across 85+ aesthetic procedures. Real-time inference executes on-device with zero cloud photo uploads.',
    TH: 'การจำลองใบหน้า 3 มิติผ่านเบราว์เซอร์สำหรับหัตถการความงามกว่า 85+ รายการ ประมวลผลแบบเรียลไทม์บนอุปกรณ์โดยไม่ต้องอัปโหลดภาพขึ้นคลาวด์',
    KO: '85개 이상의 미용 시술을 지원하는 브라우저 기반 3D 안면 시뮬레이션. 클라우드 사진 업로드 없이 기기 내에서 실시간으로 안전하게 실행됩니다.',
    PT: 'Simulação facial 3D nativa no navegador em mais de 85 procedimentos estéticos. A inferência em tempo real é executada no dispositivo sem upload de fotos na nuvem.',
    JA: '85種類以上の美容施術に対応したブラウザネイティブ3D顔面シミュレーション。クラウドへの写真アップロードなしでデバイス内でリアルタイム推論を実行。',
  },
  'Apply for Founding Partner': {
    EN: 'Apply for Founding Partner',
    TH: 'สมัครเป็นพันธมิตรผู้ร่วมก่อตั้ง',
    KO: '창립 파트너 신청',
    PT: 'Candidatar-se a Parceiro Fundador',
    JA: '創設パートナーに応募',
  },
  'Explore Procedures': {
    EN: 'Explore Procedures',
    TH: 'สำรวจหัตถการทั้งหมด',
    KO: '시술 둘러보기',
    PT: 'Explorar Procedimentos',
    JA: '施術を詳しく見る',
  },
  'Client-Side GPU WebGL2': {
    EN: 'Client-Side GPU WebGL2',
    TH: 'GPU ฝั่งไคลเอนต์ WebGL2',
    KO: '클라이언트 측 GPU WebGL2',
    PT: 'GPU do Cliente WebGL2',
    JA: 'クライアント側GPU WebGL2',
  },
  '468 Anatomical Landmarks': {
    EN: '468 Anatomical Landmarks',
    TH: '468 จุดสังเกตทางกายวิภาค',
    KO: '468개의 해부학적 랜드마크',
    PT: '468 Pontos Anatômicos',
    JA: '468箇所の解剖学的ランドマーク',
  },
  '0.04mm RMSD Precision': {
    EN: '0.04mm RMSD Precision',
    TH: 'ความแม่นยำ 0.04 มม. RMSD',
    KO: '0.04mm RMSD 정밀도',
    PT: 'Precisão RMSD de 0,04 mm',
    JA: '0.04mm RMSD高精度',
  },
  '468 Landmark Mesh': {
    EN: '468 Landmark Mesh',
    TH: 'ตาข่าย 468 จุดสังเกต',
    KO: '468 랜드마크 메시',
    PT: 'Malha de 468 Pontos',
    JA: '468ランドマークメッシュ',
  },

  // Audience Split
  'Close more consultations with visual certainty.': {
    EN: 'Close more consultations with visual certainty.',
    TH: 'เพิ่มอัตราการปิดการปรึกษาด้วยความมั่นใจทางสายตา',
    KO: '시각적 확신으로 더 많은 상담을 성공으로 이끄세요.',
    PT: 'Feche mais consultas com certeza visual.',
    JA: '視覚的な確信でカウンセリングの成約率を向上。',
  },
  'Show patients a real-time visual preview of their procedure options during the consultation. Uses any standard iPad or laptop with zero external hardware.': {
    EN: 'Show patients a real-time visual preview of their procedure options during the consultation. Uses any standard iPad or laptop with zero external hardware.',
    TH: 'แสดงผลจำลองภาพตัวเลือกหัตถการให้คนไข้ดูแบบเรียลไทม์ระหว่างการปรึกษา ใช้งานได้บน iPad หรือแล็ปท็อปทั่วไปโดยไม่ต้องใช้อุปกรณ์เสริม',
    KO: '상담 중 환자에게 시술 옵션을 실시간 시각적 미리보기로 보여주세요. 별도 하드웨어 없이 일반 iPad나 노트북에서 바로 사용 가능합니다.',
    PT: 'Mostre aos pacientes uma prévia visual em tempo real de suas opções de procedimento durante a consulta. Funciona em qualquer iPad ou laptop padrão.',
    JA: 'カウンセリング中に患者へ施術オプションをリアルタイムで視覚的に提示。専用機器不要でiPadやノートPCですぐに使用可能。',
  },
  'Explore for Surgeons': {
    EN: 'Explore for Surgeons',
    TH: 'สำรวจสำหรับศัลยแพทย์',
    KO: '의사용 솔루션 보기',
    PT: 'Explorar para Cirurgiões',
    JA: '医師向け機能を見る',
  },
  'See possibilities before making your decision.': {
    EN: 'See possibilities before making your decision.',
    TH: 'เห็นความเป็นไปได้ก่อนตัดสินใจ',
    KO: '결정하기 전에 결과를 미리 확인하세요.',
    PT: 'Veja as possibilidades antes de tomar sua decisão.',
    JA: '施術を決める前に可能性を確認。',
  },
  'Explore 85+ procedure simulations directly from your phone browser. No app download, and real-time processing runs 100% on your device.': {
    EN: 'Explore 85+ procedure simulations directly from your phone browser. No app download, and real-time processing runs 100% on your device.',
    TH: 'สำรวจแบบจำลองหัตถการกว่า 85+ รายการได้โดยตรงจากเบราว์เซอร์มือถือของคุณ ไม่ต้องดาวน์โหลดแอป ประมวลผลบนอุปกรณ์ 100%',
    KO: '스마트폰 브라우저에서 85개 이상의 시술 시뮬레이션을 직접 체험하세요. 앱 다운로드 없이 100% 기기 내에서 처리됩니다.',
    PT: 'Explore mais de 85 simulações de procedimentos direto no navegador do celular. Sem download de aplicativo, processamento 100% no seu aparelho.',
    JA: 'スマートフォンのブラウザから直接85以上の施術シミュレーションを体験。アプリのダウンロード不要、すべて端末上で完結。',
  },
  'Explore for Patients': {
    EN: 'Explore for Patients',
    TH: 'สำรวจสำหรับคนไข้',
    KO: '환자용 솔루션 보기',
    PT: 'Explorar para Pacientes',
    JA: '患者向け機能を見る',
  },

  // How It Works (60-Second Protocol)
  'THE 60-SECOND PROTOCOL': {
    EN: 'THE 60-SECOND PROTOCOL',
    TH: 'โพรโทคอล 60 วินาที',
    KO: '60초 프로토콜',
    PT: 'O PROTOCOLO DE 60 SEGUNDOS',
    JA: '60秒プロトコル',
  },
  'From photo to preview in 60 seconds.': {
    EN: 'From photo to preview in 60 seconds.',
    TH: 'จากภาพถ่ายสู่ภาพตัวอย่างใน 60 วินาที',
    KO: '사진에서 시뮬레이션 미리보기까지 단 60초.',
    PT: 'Da foto à prévia em 60 segundos.',
    JA: '写真からプレビューまでわずか60秒。',
  },
  'Four steps. One consultation. 100% browser-native inference.': {
    EN: 'Four steps. One consultation. 100% browser-native inference.',
    TH: '4 ขั้นตอน การปรึกษาครั้งเดียว ประมวลผลบนเบราว์เซอร์ 100%',
    KO: '4단계. 단 한 번의 상담. 100% 브라우저 네이티브 추론.',
    PT: 'Quatro etapas. Uma consulta. Inferência 100% nativa no navegador.',
    JA: '4つのステップ。1回のカウンセリング。100%ブラウザネイティブ処理。',
  },
  'Capture': {
    EN: 'Capture',
    TH: 'ถ่ายภาพ',
    KO: '사진 촬영',
    PT: 'Capturar',
    JA: '撮影',
  },
  'Take a standard front-facing photo with any smartphone or iPad in the consultation room.': {
    EN: 'Take a standard front-facing photo with any smartphone or iPad in the consultation room.',
    TH: 'ถ่ายภาพหน้าตรงมาตรฐานด้วยสมาร์ตโฟนหรือ iPad ในห้องตรวจ',
    KO: '상담실에서 스마트폰이나 iPad로 표준 정면 사진을 촬영하세요.',
    PT: 'Tire uma foto frontal padrão com qualquer smartphone ou iPad na sala de consulta.',
    JA: 'カウンセリング室でスマートフォンやiPadを使って正面写真を撮影します。',
  },
  'Simulate': {
    EN: 'Simulate',
    TH: 'จำลองผลลัพธ์',
    KO: '시뮬레이션',
    PT: 'Simular',
    JA: 'シミュレーション',
  },
  '468 anatomical landmarks are mapped in real time on-device with zero server round-trips.': {
    EN: '468 anatomical landmarks are mapped in real time on-device with zero server round-trips.',
    TH: 'จุดสังเกตทางกายวิภาค 468 จุดถูกแมปแบบเรียลไทม์บนอุปกรณ์โดยไม่ต้องส่งข้อมูลไปยังเซิร์ฟเวอร์',
    KO: '468개의 해부학적 랜드마크가 서버 통신 없이 기기 내에서 실시간 매핑됩니다.',
    PT: '468 pontos anatômicos são mapeados em tempo real no dispositivo com zero viagens ao servidor.',
    JA: 'サーバーとの通信なしで、468箇所の解剖学的ランドマークを端末上でリアルタイム配置。',
  },
  'Align': {
    EN: 'Align',
    TH: 'ปรับแต่งผลลัพธ์',
    KO: '방향 조율',
    PT: 'Alinhar',
    JA: 'すり合わせ',
  },
  'Adjust surgical and soft-tissue parameters side-by-side to align patient expectations.': {
    EN: 'Adjust surgical and soft-tissue parameters side-by-side to align patient expectations.',
    TH: 'ปรับพารามิเตอร์การผ่าตัดและเนื้อเยื่ออ่อนแบบเคียงข้างกันเพื่อตอบโจทย์ความคาดหวังของคนไข้',
    KO: '수술 및 연조직 파라미터를 나란히 조정하여 환자의 기대치를 정확히 맞춥니다.',
    PT: 'Ajuste os parâmetros cirúrgicos e de tecido mole lado a lado para alinhar as expectativas do paciente.',
    JA: '手術や軟部組織のパラメータを画面上で調整し、患者の希望と正確にすり合わせます。',
  },
  'Discuss': {
    EN: 'Discuss',
    TH: 'ปรึกษาและวางแผน',
    KO: '상담 및 결정',
    PT: 'Discutir',
    JA: 'カウンセリング',
  },
  'Proceed with the consultation grounded in a clear visual plan agreed upon in the room.': {
    EN: 'Proceed with the consultation grounded in a clear visual plan agreed upon in the room.',
    TH: 'ดำเนินขั้นตอนการปรึกษาอย่างมั่นใจตามแผนการรักษาทางสายตาที่เห็นพ้องต้องกันในห้องตรวจ',
    KO: '상담실에서 함께 합의한 명확한 시각적 계획을 바탕으로 상담을 진행하세요.',
    PT: 'Prossiga com a consulta com base em um plano visual claro acordado na sala.',
    JA: 'その場で合意した明確なシミュレーション結果をもとに、納得のいくカウンセリングを実施。',
  },

  // Procedure Constellation (Explorer)
  'PROCEDURE CONSTELLATION': {
    EN: 'PROCEDURE CONSTELLATION',
    TH: 'กลุ่มหัตถการทั้งหมด',
    KO: '시술 컨스텔레이션',
    PT: 'CONSTELAÇÃO DE PROCEDIMENTOS',
    JA: '施術ラインナップ',
  },
  '85+ procedural simulations.': {
    EN: '85+ procedural simulations.',
    TH: '85+ การจำลองหัตถการ',
    KO: '85개 이상의 시술 시뮬레이션.',
    PT: 'Mais de 85 simulações de procedimentos.',
    JA: '85種類以上の施術シミュレーション。',
  },
  'Parametric visual models calculated client-side with 468 landmark tracking precision.': {
    EN: 'Parametric visual models calculated client-side with 468 landmark tracking precision.',
    TH: 'โมเดลจำลองคำนวณบนฝั่งไคลเอนต์ด้วยความแม่นยำในการติดตามจุดสังเกต 468 จุด',
    KO: '468개 랜드마크 추적 정밀도로 클라이언트 측에서 계산되는 매개변수 시각 모델.',
    PT: 'Modelos visuais paramétricos calculados no cliente com precisão de rastreamento de 468 pontos.',
    JA: '468箇所のランドマーク追跡精度でクライアント側にて計算される高精度3Dモデル。',
  },
  'View All Procedures': {
    EN: 'View All Procedures',
    TH: 'ดูหัตถการทั้งหมด',
    KO: '모든 시술 보기',
    PT: 'Ver Todos os Procedimentos',
    JA: 'すべての施術を見る',
  },
  'View Clinical Guide': {
    EN: 'View Clinical Guide',
    TH: 'ดูคู่มือคลินิก',
    KO: '임상 가이드 보기',
    PT: 'Ver Guia Clínico',
    JA: '臨床ガイドを見る',
  },
  'View Clinical Guide →': {
    EN: 'View Clinical Guide →',
    TH: 'ดูคู่มือคลินิก →',
    KO: '임상 가이드 보기 →',
    PT: 'Ver Guia Clínico →',
    JA: '臨床ガイドを見る →',
  },

  // Procedure categories
  'Surgical': {
    EN: 'Surgical',
    TH: 'ศัลยกรรมผ่าตัด',
    KO: '수술적 시술',
    PT: 'Cirúrgico',
    JA: '外科的施術',
  },
  'Non-Surgical': {
    EN: 'Non-Surgical',
    TH: 'ไม่ผ่าตัด',
    KO: '비수술적 시술',
    PT: 'Não-Cirúrgico',
    JA: '非外科的施術',
  },
  'Injectable': {
    EN: 'Injectable',
    TH: 'ฉีดสารเติมเต็ม',
    KO: '주사 시술',
    PT: 'Injetáveis',
    JA: '注入系施術',
  },
  'Dental': {
    EN: 'Dental',
    TH: 'ทันตกรรม',
    KO: '치과',
    PT: 'Odontológico',
    JA: '審美歯科',
  },
  'Body': {
    EN: 'Body',
    TH: 'รูปร่าง',
    KO: '체형 성형',
    PT: 'Corporal',
    JA: 'ボディ',
  },
  'Hair': {
    EN: 'Hair',
    TH: 'เส้นผม',
    KO: '모발 이식',
    PT: 'Capilar',
    JA: '自毛植毛',
  },

  // Procedure Names & Short Descriptions
  'Rhinoplasty': {
    EN: 'Rhinoplasty',
    TH: 'ศัลยกรรมเสริมจมูก',
    KO: '코 성형술',
    PT: 'Rinoplastia',
    JA: '鼻整形（隆鼻術）',
  },
  'Nose reshaping — tip, bridge, and alar base visualization.': {
    EN: 'Nose reshaping — tip, bridge, and alar base visualization.',
    TH: 'ปรับแต่งรูปทรงจมูก — ปลาย สัน และปีกจมูก',
    KO: '코 재형성 — 코끝, 콧대, 콧볼 시각화.',
    PT: 'Remodelagem do nariz — ponta, dorso e asas nasais.',
    JA: '鼻の再形成 — 鼻尖・鼻背・小鼻の可視化。',
  },
  'Blepharoplasty': {
    EN: 'Blepharoplasty',
    TH: 'ศัลยกรรมตาสองชั้น/หนังตา',
    KO: '눈꺼풀 성형술',
    PT: 'Blefaroplastia',
    JA: '眼瞼下垂・二重形成',
  },
  'Eyelid refinement — upper and lower lid visualization.': {
    EN: 'Eyelid refinement — upper and lower lid visualization.',
    TH: 'ตกแต่งเปลือกตา — การจำลองเปลือกตาบนและล่าง',
    KO: '눈꺼풀 교정 — 상안검 및 하안검 시각화.',
    PT: 'Refinamento das pálpebras — superior e inferior.',
    JA: 'まぶたの改善 — 上眼瞼・下眼瞼の可視化。',
  },
  'Facelift': {
    EN: 'Facelift',
    TH: 'ศัลยกรรมดึงหน้า',
    KO: '안면 거상술',
    PT: 'Lifting Facial',
    JA: 'フェイスリフト',
  },
  'Facial rejuvenation — midface and jawline visualization.': {
    EN: 'Facial rejuvenation — midface and jawline visualization.',
    TH: 'ฟื้นฟูความอ่อนเยาว์ของใบหน้า — แนวกรามและใบหน้าส่วนกลาง',
    KO: '안면 회춘술 — 중안부 및 턱선 시각화.',
    PT: 'Rejuvenescimento facial — terço médio e mandíbula.',
    JA: '顔面の若返り — 中顔面およびフェイスラインの可視化。',
  },
  'Brow Lift': {
    EN: 'Brow Lift',
    TH: 'ศัลยกรรมยกคิ้ว',
    KO: '이마/눈썹 거상술',
    PT: 'Lifting de Sobrancelhas',
    JA: '眉毛リフト（ブローリフト）',
  },
  'Brow repositioning — forehead and brow arch visualization.': {
    EN: 'Brow repositioning — forehead and brow arch visualization.',
    TH: 'ปรับตำแหน่งคิ้ว — หน้าผากและแนวโค้งของคิ้ว',
    KO: '눈썹 위치 교정 — 이마 및 눈썹 라인 시각화.',
    PT: 'Reposicionamento de sobrancelhas — testa e arco.',
    JA: '眉の再配置 — 額および眉弓の可視化。',
  },
  'Otoplasty': {
    EN: 'Otoplasty',
    TH: 'ศัลยกรรมตกแต่งใบหู',
    KO: '귀 성형술 (이개성형)',
    PT: 'Otoplastia',
    JA: '耳介形成術（立ち耳修正）',
  },
  'Ear reshaping — prominence and position visualization.': {
    EN: 'Ear reshaping — prominence and position visualization.',
    TH: 'ปรับรูปทรงใบหู — ความกางและตำแหน่งใบหู',
    KO: '귀 모양 교정 — 돌출도 및 위치 시각화.',
    PT: 'Remodelagem da orelha — projeção e posição.',
    JA: '耳の形状補正 — 突出度と位置の可視化。',
  },
  'V-Line Contouring': {
    EN: 'V-Line Contouring',
    TH: 'ศัลยกรรมปรับโครงหน้า V-Line',
    KO: 'V라인 윤곽 수술',
    PT: 'Contorno em V (V-Line)',
    JA: 'Vライン輪郭形成術',
  },
  'Jaw and chin reshaping — mandible and lower face visualization.': {
    EN: 'Jaw and chin reshaping — mandible and lower face visualization.',
    TH: 'ปรับโครงกรามและคาง — ขากรรไกรและใบหน้าส่วนล่าง',
    KO: '턱 및 턱끝 재형성 — 하악 및 하안부 시각화.',
    PT: 'Remodelagem de mandíbula e queixo — terço inferior.',
    JA: '顎およびオトガイの再形成 — 下顎と下顔面の可視化。',
  },

  // Practice Economics (Metrics Section)
  'PRACTICE ECONOMICS': {
    EN: 'PRACTICE ECONOMICS',
    TH: 'ผลลัพธ์ทางเศรษฐศาสตร์ของคลินิก',
    KO: '클리닉 경제적 성과',
    PT: 'ECONOMIA DA CLÍNICA',
    JA: 'クリニック経営への貢献',
  },
  'Clinical outcomes validated in daily consultations.': {
    EN: 'Clinical outcomes validated in daily consultations.',
    TH: 'ผลลัพธ์ทางคลินิกที่ผ่านการพิสูจน์ในการให้คำปรึกษาประจำวัน',
    KO: '실제 일일 상담에서 검증된 임상 성과.',
    PT: 'Resultados clínicos validados em consultas diárias.',
    JA: '日々のカウンセリングで実証された臨床成果。',
  },
  'Less Consult Time': {
    EN: 'Less Consult Time',
    TH: 'ประหยัดเวลาการปรึกษา',
    KO: '상담 시간 단축',
    PT: 'Menos Tempo de Consulta',
    JA: 'カウンセリング時間短縮',
  },
  'LESS CONSULT TIME': {
    EN: 'LESS CONSULT TIME',
    TH: 'ประหยัดเวลาการปรึกษา',
    KO: '상담 시간 단축',
    PT: 'MENOS TEMPO DE CONSULTA',
    JA: 'カウンセリング時間短縮',
  },
  'Patients arrive visually aligned before examination starts.': {
    EN: 'Patients arrive visually aligned before examination starts.',
    TH: 'คนไข้มีความเข้าใจตรงกันทางสายตาก่อนเริ่มตรวจร่างกาย',
    KO: '진찰이 시작되기 전에 환자가 시각적으로 이해하고 동의합니다.',
    PT: 'Os pacientes chegam visualmente alinhados antes do início do exame.',
    JA: '診察開始前に患者と視覚的なイメージを共有。',
  },
  'Conversion Confidence': {
    EN: 'Conversion Confidence',
    TH: 'ความมั่นใจในการตัดสินใจ',
    KO: '전환 확신도 향상',
    PT: 'Confiança na Conversão',
    JA: '成約率と納得感の向上',
  },
  'CONVERSION CONFIDENCE': {
    EN: 'CONVERSION CONFIDENCE',
    TH: 'ความมั่นใจในการตัดสินใจ',
    KO: '전환 확신도 향상',
    PT: 'CONFIANÇA NA CONVERSÃO',
    JA: '成約率と納得感の向上',
  },
  'Have informed visual discussions during the consultation in the room.': {
    EN: 'Have informed visual discussions during the consultation in the room.',
    TH: 'พูดคุยด้วยภาพที่ชัดเจนในห้องตรวจระหว่างการปรึกษา',
    KO: '상담실에서 명확한 시각 자료를 바탕으로 심도 있는 상담을 진행하세요.',
    PT: 'Tenha discussões visuais informadas durante a consulta na sala.',
    JA: '診察室で具体的かつ視覚的な情報をもとに相談を実施。',
  },
  'Higher Consultation Fees': {
    EN: 'Higher Consultation Fees',
    TH: 'ค่าบริการปรึกษาที่สูงขึ้น',
    KO: '프리미엄 상담 가치 창출',
    PT: 'Honorários de Consulta Mais Altos',
    JA: 'プレミアムなカウンセリング価値',
  },
  'HIGHER CONSULTATION FEES': {
    EN: 'HIGHER CONSULTATION FEES',
    TH: 'ค่าบริการปรึกษาที่สูงขึ้น',
    KO: '프리미엄 상담 가치 창출',
    PT: 'HONORÁRIOS DE CONSULTA MAIS ALTOS',
    JA: 'プレミアムなカウンセリング価値',
  },
  'Practices utilizing simulation command premium consultation rates.': {
    EN: 'Practices utilizing simulation command premium consultation rates.',
    TH: 'คลินิกที่ใช้ระบบจำลองภาพสามารถตั้งอัตราค่าปรึกษาระดับพรีเมียมได้',
    KO: '3D 시뮬레이션을 활용하는 클리닉은 프리미엄 상담료를 인정받습니다.',
    PT: 'Clínicas que utilizam simulação cobram taxas de consulta premium.',
    JA: 'シミュレーションを導入したクリニックは高付加価値な相談料を設定可能。',
  },
  'Server Hops': {
    EN: 'Server Hops',
    TH: 'การส่งข้อมูลผ่านเซิร์ฟเวอร์',
    KO: '서버 데이터 전송',
    PT: 'Saltos de Servidor',
    JA: '外部サーバー通信',
  },
  'SERVER HOPS': {
    EN: 'SERVER HOPS',
    TH: 'การส่งข้อมูลผ่านเซิร์ฟเวอร์',
    KO: '서버 데이터 전송',
    PT: 'SALTOS DE SERVIDOR',
    JA: '外部サーバー通信',
  },
  '100% on-device WebGL2 neural inference with zero cloud latency.': {
    EN: '100% on-device WebGL2 neural inference with zero cloud latency.',
    TH: 'การประมวลผล WebGL2 บนอุปกรณ์ 100% โดยไม่มีความหน่วงของคลาวด์',
    KO: '클라우드 지연 없는 100% 기기 내 WebGL2 신경망 추론.',
    PT: 'Inferência neural WebGL2 100% no dispositivo com zero latência na nuvem.',
    JA: 'クラウドラテンシーゼロの100%端末内WebGL2ニューラル処理。',
  },
  '“This transformed how we communicate surgical possibilities in our clinic.”': {
    EN: '“This transformed how we communicate surgical possibilities in our clinic.”',
    TH: '“สิ่งนี้เปลี่ยนวิธีที่เราสื่อสารความเป็นไปได้ในการผ่าตัดในคลินิกของเราอย่างสิ้นเชิง”',
    KO: '“우리 클리닉에서 수술 가능성을 설명하는 방식을 완전히 바꾸어 놓았습니다.”',
    PT: '“Isso transformou a forma como comunicamos as possibilidades cirúrgicas em nossa clínica.”',
    JA: '「当院における手術結果のコミュニケーション方法が劇的に変わりました。」',
  },
  'PLASTIC SURGEON • BANGKOK PARTNER CLINIC': {
    EN: 'PLASTIC SURGEON • BANGKOK PARTNER CLINIC',
    TH: 'ศัลยแพทย์ตกแต่ง • คลินิกพันธมิตรกรุงเทพฯ',
    KO: '성형외과 전문의 • 방콕 파트너 클리닉',
    PT: 'CIRURGIÃO PLÁSTICO • CLÍNICA PARCEIRA DE BANGKOK',
    JA: '形成外科専門医 • バンコク提携クリニック',
  },

  // Technology & Engineering
  'ENGINEERING & ARCHITECTURE': {
    EN: 'ENGINEERING & ARCHITECTURE',
    TH: 'วิศวกรรมและสถาปัตยกรรมระบบ',
    KO: '엔지니어링 및 기술 구조',
    PT: 'ENGENHARIA E ARQUITETURA',
    JA: 'エンジニアリング＆アーキテクチャ',
  },
  '468 landmarks. 0 server hops.': {
    EN: '468 landmarks. 0 server hops.',
    TH: '468 จุดสังเกต ส่งข้อมูลผ่านเซิร์ฟเวอร์เป็น 0',
    KO: '468개 랜드마크. 서버 전송 0회.',
    PT: '468 pontos anatômicos. 0 saltos de servidor.',
    JA: '468箇所のランドマーク。外部サーバー送信ゼロ。',
  },
  'Every simulation is powered by client-side WebGL2 neural shaders executing in browser memory. No cloud upload bottlenecks.': {
    EN: 'Every simulation is powered by client-side WebGL2 neural shaders executing in browser memory. No cloud upload bottlenecks.',
    TH: 'ทุกการจำลองขับเคลื่อนด้วยเชดเดอร์ WebGL2 บนฝั่งไคลเอนต์ในหน่วยความจำเบราว์เซอร์ หมดปัญหาคอขวดจากการอัปโหลดขึ้นคลาวด์',
    KO: '모든 시뮬레이션은 브라우저 메모리에서 실행되는 클라이언트 측 WebGL2 신경망 셰이더로 구동됩니다. 클라우드 업로드 병목 현상이 없습니다.',
    PT: 'Cada simulação é alimentada por shaders neurais WebGL2 no cliente executados na memória do navegador. Sem gargalos de upload na nuvem.',
    JA: 'すべてのシミュレーションはブラウザのメモリ内で実行されるWebGL2ニューラルシェーダーで稼働。クラウド送信の遅延が一切ありません。',
  },
  '468-Point Facial Mesh': {
    EN: '468-Point Facial Mesh',
    TH: 'โครงตาข่ายใบหน้า 468 จุด',
    KO: '468개 포인트 안면 메시',
    PT: 'Malha Facial de 468 Pontos',
    JA: '468ポイント顔面メッシュ',
  },
  'Continuous landmark tracking maps full anatomical geometry with 0.04mm RMSD sub-millimeter precision.': {
    EN: 'Continuous landmark tracking maps full anatomical geometry with 0.04mm RMSD sub-millimeter precision.',
    TH: 'การติดตามจุดสังเกตอย่างต่อเนื่องเพื่อแมปโครงสร้างทางกายวิภาคอย่างสมบูรณ์ด้วยความแม่นยำระดับต่ำกว่ามิลลิเมตร 0.04 มม. RMSD',
    KO: '지속적인 랜드마크 추적으로 0.04mm RMSD 초정밀 해부학적 지오메트리를 매핑합니다.',
    PT: 'O rastreamento contínuo de pontos mapeia a geometria anatômica completa com precisão submilimétrica de 0,04 mm RMSD.',
    JA: '連続ランドマークトラッキングにより、0.04mm RMSDのサブミリ単位の精度で解剖学的形状をマッピング。',
  },
  'Real-Time Browser Inference': {
    EN: 'Real-Time Browser Inference',
    TH: 'การประมวลผลบนเบราว์เซอร์แบบเรียลไทม์',
    KO: '실시간 브라우저 AI 추론',
    PT: 'Inferência em Tempo Real no Navegador',
    JA: 'リアルタイム・ブラウザ内推論',
  },
  'All neural networks compile down to WebGL2 fragment shaders running on your local device GPU.': {
    EN: 'All neural networks compile down to WebGL2 fragment shaders running on your local device GPU.',
    TH: 'โครงข่ายประสาททั้งหมดถูกคอมไพล์เป็น WebGL2 Fragment Shaders ที่ทำงานบน GPU ของอุปกรณ์คุณ',
    KO: '모든 신경망은 로컬 기기 GPU에서 실행되는 WebGL2 프래그먼트 셰이더로 컴파일됩니다.',
    PT: 'Todas as redes neurais são compiladas em fragment shaders WebGL2 executados na GPU do seu dispositivo local.',
    JA: 'すべてのニューラルネットワークは端末のGPUで動作するWebGL2フラグメントシェーダーに最適化。',
  },
  'Zero Data Egress Architecture': {
    EN: 'Zero Data Egress Architecture',
    TH: 'สถาปัตยกรรมข้อมูลไม่รั่วไหลออกภายนอก',
    KO: '데이터 외부 유출 제로 아키텍처',
    PT: 'Arquitetura de Zero Egress de Dados',
    JA: 'データ完全非送信アーキテクチャ',
  },
  'Facial photos never transmit across remote server networks during real-time simulation.': {
    EN: 'Facial photos never transmit across remote server networks during real-time simulation.',
    TH: 'ภาพถ่ายใบหน้าจะไม่ถูกส่งผ่านเครือข่ายเซิร์ฟเวอร์ระยะไกลระหว่างการจำลองแบบเรียลไทม์',
    KO: '실시간 시뮬레이션 중 환자의 얼굴 사진이 원격 서버 네트워크로 절대 전송되지 않습니다.',
    PT: 'Fotos faciais nunca são transmitidas por redes de servidores remotos durante a simulação em tempo real.',
    JA: 'リアルタイムシミュレーション中、顔写真が外部サーバーに送信されることは一切ありません。',
  },
  'RMSD Precision': {
    EN: 'RMSD Precision',
    TH: 'ความแม่นยำ RMSD',
    KO: 'RMSD 정밀도',
    PT: 'Precisão RMSD',
    JA: 'RMSD精度',
  },
  'Render Latency': {
    EN: 'Render Latency',
    TH: 'ความหน่วงในการเรนเดอร์',
    KO: '렌더링 지연 시간',
    PT: 'Latência de Renderização',
    JA: '描画遅延',
  },
  'Server Roundtrips': {
    EN: 'Server Roundtrips',
    TH: 'รอบการส่งข้อมูลเซิร์ฟเวอร์',
    KO: '서버 왕복 통신',
    PT: 'Viagens ao Servidor',
    JA: 'サーバー通信回数',
  },
  'NVIDIA Inception Program Member': {
    EN: 'NVIDIA Inception Program Member',
    TH: 'สมาชิกโครงการ NVIDIA Inception',
    KO: 'NVIDIA Inception 프로그램 멤버',
    PT: 'Membro do Programa NVIDIA Inception',
    JA: 'NVIDIA Inception プログラム メンバー',
  },
  'Accelerating medical graphics and on-device neural rendering.': {
    EN: 'Accelerating medical graphics and on-device neural rendering.',
    TH: 'เร่งประสิทธิภาพกราฟิกทางการแพทย์และการเรนเดอร์ประสาทบนอุปกรณ์',
    KO: '의료 그래픽 및 온디바이스 신경망 렌더링 가속화.',
    PT: 'Acelerando gráficos médicos e renderização neural no dispositivo.',
    JA: '医療グラフィックスと端末内ニューラルレンダリングを高速化。',
  },
  'Read Architecture Paper': {
    EN: 'Read Architecture Paper',
    TH: 'อ่านเอกสารสถาปัตยกรรมระบบ',
    KO: '아키텍처 백서 읽기',
    PT: 'Ler Artigo de Arquitetura',
    JA: '技術論文を読む',
  },

  // Comparison
  'HONEST BENCHMARKING': {
    EN: 'HONEST BENCHMARKING',
    TH: 'การเปรียบเทียบมาตรฐานอย่างตรงไปตรงมา',
    KO: '객관적 벤치마크 비교',
    PT: 'BENCHMARKING HONESTO',
    JA: '他社との客観的比較',
  },
  'The surgical simulation market, compared.': {
    EN: 'The surgical simulation market, compared.',
    TH: 'เปรียบเทียบตลาดเครื่องจำลองศัลยกรรม',
    KO: '수술 시뮬레이션 시장 비교 분석.',
    PT: 'O mercado de simulação cirúrgica, comparado.',
    JA: '手術シミュレーション市場の徹底比較。',
  },
  'Why modern aesthetic clinics are transitioning from five-figure hardware towers to web-native platforms.': {
    EN: 'Why modern aesthetic clinics are transitioning from five-figure hardware towers to web-native platforms.',
    TH: 'เหตุใดคลินิกความงามสมัยใหม่จึงเปลี่ยนจากเครื่องฮาร์ดแวร์ราคาสูงลิบมาใช้แพลตฟอร์มบนเว็บ',
    KO: '현대 미용 클리닉들이 수천만 원대 하드웨어 장비에서 웹 기반 플랫폼으로 전환하는 이유.',
    PT: 'Por que clínicas estéticas modernas estão migrando de torres de hardware caras para plataformas web.',
    JA: '多くの美容クリニックが高額な専用ハードウェア機器からWebネイティブプラットフォームへと移行している理由。',
  },

  // Privacy Section
  'PRIVACY ARCHITECTURE': {
    EN: 'PRIVACY ARCHITECTURE',
    TH: 'สถาปัตยกรรมความเป็นส่วนตัว',
    KO: '프라이버시 아키텍처',
    PT: 'ARQUITETURA DE PRIVACIDADE',
    JA: 'プライバシー設計',
  },
  'What happens to your photo.': {
    EN: 'What happens to your photo.',
    TH: 'เกิดอะไรขึ้นกับภาพถ่ายของคุณ',
    KO: '환자분의 사진은 어떻게 처리되나요?',
    PT: 'O que acontece com a sua foto.',
    JA: '写真データの取り扱いについて',
  },
  'The real-time simulator runs entirely on-device inside your web browser. Zero patient photos are uploaded or stored on any remote cloud server during simulation.': {
    EN: 'The real-time simulator runs entirely on-device inside your web browser. Zero patient photos are uploaded or stored on any remote cloud server during simulation.',
    TH: 'ระบบจำลองแบบเรียลไทม์ทำงานบนอุปกรณ์ภายในเว็บเบราว์เซอร์ของคุณอย่างสมบูรณ์ ไม่มีภาพถ่ายของคนไข้ถูกอัปโหลดหรือจัดเก็บบนเซิร์ฟเวอร์คลาวด์ใดๆ',
    KO: '실시간 시뮬레이터는 웹 브라우저 내에서 100% 기기 자체로 작동합니다. 시뮬레이션 중 환자 사진은 원격 클라우드 서버에 절대 업로드되거나 저장되지 않습니다.',
    PT: 'O simulador em tempo real roda inteiramente no dispositivo dentro do navegador. Nenhuma foto de paciente é enviada ou armazenada na nuvem.',
    JA: 'リアルタイムシミュレーターはお手元のブラウザ内で完全に完結。シミュレーション中に写真がクラウドへ保存・送信されることは一切ありません。',
  },
  'On-Device Execution (Always)': {
    EN: 'On-Device Execution (Always)',
    TH: 'ประมวลผลบนอุปกรณ์เสมอ (Always)',
    KO: '온디바이스 실행 (항상 보장)',
    PT: 'Execução no Dispositivo (Sempre)',
    JA: '完全端末内処理（常時）',
  },
  'Landmark tracking (468 points), 3D mesh deformation, before/after slider comparison, and parameter adjustments run 100% locally.': {
    EN: 'Landmark tracking (468 points), 3D mesh deformation, before/after slider comparison, and parameter adjustments run 100% locally.',
    TH: 'การติดตามจุดสังเกต 468 จุด การแปลงโครงตาข่าย 3 มิติ แถบเลื่อนเปรียบเทียบก่อน/หลัง และการปรับพารามิเตอร์ทำงานภายในเครื่อง 100%',
    KO: '468개 랜드마크 추적, 3D 메시 변형, 전후 비교 슬라이더 및 파라미터 조정이 100% 로컬에서 실행됩니다.',
    PT: 'Rastreamento de pontos (468 pontos), deformação de malha 3D, comparação antes/depois e ajustes de parâmetros rodam 100% localmente.',
    JA: '468ポイントの追跡、3Dメッシュ変形、術前術後スライダー比較、各種調整が100%ローカルで実行されます。',
  },
  'Permanent Zero-Training Commitment': {
    EN: 'Permanent Zero-Training Commitment',
    TH: 'ข้อผูกพันถาวร: ไม่นำข้อมูลไปเทรนโมเดล AI',
    KO: 'AI 모델 학습 절대 미사용 영구 서약',
    PT: 'Compromisso Permanente de Zero Treinamento',
    JA: 'AIモデル学習への完全不使用誓約',
  },
  'We never use patient photos to train machine learning models.': {
    EN: 'We never use patient photos to train machine learning models.',
    TH: 'เราจะไม่นำภาพถ่ายของคนไข้ไปใช้ฝึกอบรมโมเดลแมชชีนเลิร์นนิงโดยเด็ดขาด',
    KO: '환자의 사진을 머신러닝 모델 학습에 절대로 사용하지 않습니다.',
    PT: 'Nunca usamos fotos de pacientes para treinar modelos de aprendizado de máquina.',
    JA: '患者様の写真を機械学習モデルのトレーニングに使用することは決してありません。',
  },
  'Read Full Privacy Commitment': {
    EN: 'Read Full Privacy Commitment',
    TH: 'อ่านข้อผูกพันความเป็นส่วนตัวฉบับเต็ม',
    KO: '개인정보 보호 서약 전문 읽기',
    PT: 'Ler Compromisso Completo de Privacidade',
    JA: 'プライバシーポリシーの全文を見る',
  },
  'ZERO DATA EGRESS': {
    EN: 'ZERO DATA EGRESS',
    TH: 'ข้อมูลไม่รั่วไหลออกภายนอก',
    KO: '데이터 유출 제로',
    PT: 'ZERO EGRESS DE DADOS',
    JA: 'データ送信ゼロ',
  },
  'Device Isolation Boundary': {
    EN: 'Device Isolation Boundary',
    TH: 'ขอบเขตการแยกความปลอดภัยของอุปกรณ์',
    KO: '기기 격리 보안 영역',
    PT: 'Limite de Isolamento do Dispositivo',
    JA: '端末隔離境界セキュリティ',
  },

  // Pricing Section
  'TRANSPARENT SUBSCRIPTIONS': {
    EN: 'TRANSPARENT SUBSCRIPTIONS',
    TH: 'แพ็กเกจราคาที่โปร่งใส',
    KO: '투명한 요금제',
    PT: 'ASSINATURAS TRANSPARENTES',
    JA: '透明性の高い料金体系',
  },
  'Predictable pricing for practices of any scale.': {
    EN: 'Predictable pricing for practices of any scale.',
    TH: 'ราคาที่คาดการณ์ได้สำหรับคลินิกทุกขนาด',
    KO: '모든 규모의 클리닉을 위한 합리적이고 예측 가능한 요금제.',
    PT: 'Preços previsíveis para clínicas de qualquer escala.',
    JA: 'あらゆる規模のクリニックに適した明瞭な料金プラン。',
  },
  'No per-procedure surcharge, no scanner hardware leases. Simple monthly or annual subscriptions.': {
    EN: 'No per-procedure surcharge, no scanner hardware leases. Simple monthly or annual subscriptions.',
    TH: 'ไม่มีค่าธรรมเนียมต่อหัตถการ ไม่ต้องเช่าเครื่องสแกน สมัครรายเดือนหรือรายปีได้ง่ายๆ',
    KO: '시술 건당 추가 요금 없음, 하드웨어 리스 비용 없음. 간단한 월간 또는 연간 구독.',
    PT: 'Sem taxa por procedimento, sem aluguel de hardware. Assinaturas simples mensais ou anuais.',
    JA: '施術ごとの追加料金や機器のリース契約は一切不要。月額または年額のシンプルな定額制。',
  },
  'Monthly billing': {
    EN: 'Monthly billing',
    TH: 'ชำระรายเดือน',
    KO: '월간 결제',
    PT: 'Cobrança mensal',
    JA: '月払い',
  },
  'Annual billing': {
    EN: 'Annual billing',
    TH: 'ชำระรายปี',
    KO: '연간 결제',
    PT: 'Cobrança anual',
    JA: '年払い',
  },
  'Save 20%': {
    EN: 'Save 20%',
    TH: 'ประหยัด 20%',
    KO: '20% 할인',
    PT: 'Economize 20%',
    JA: '20%お得',
  },

  // FAQ Section
  'GOT QUESTIONS?': {
    EN: 'GOT QUESTIONS?',
    TH: 'มีคำถามเพิ่มเติม?',
    KO: '궁금한 점이 있으신가요?',
    PT: 'TEM DÚVIDAS?',
    JA: 'ご不明な点がありますか？',
  },
  'Frequently asked questions.': {
    EN: 'Frequently asked questions.',
    TH: 'คำถามที่พบบ่อย',
    KO: '자주 묻는 질문.',
    PT: 'Perguntas frequentes.',
    JA: 'よくあるご質問。',
  },
  'Everything you need to know about our browser-native simulation technology, on-device data isolation, and clinic onboarding.': {
    EN: 'Everything you need to know about our browser-native simulation technology, on-device data isolation, and clinic onboarding.',
    TH: 'ทุกสิ่งที่คุณต้องรู้เกี่ยวกับเทคโนโลยีการจำลองบนเบราว์เซอร์ การปกป้องข้อมูลในอุปกรณ์ และการเริ่มต้นใช้งานสำหรับคลินิก',
    KO: '브라우저 네이티브 시뮬레이션 기술, 기기 내 데이터 격리, 클리닉 온보딩에 대해 알아야 할 모든 것.',
    PT: 'Tudo o que você precisa saber sobre tecnologia no navegador, isolamento de dados no dispositivo e integração na clínica.',
    JA: 'ブラウザネイティブのシミュレーション技術、端末内データ隔離、クリニックへの導入に関する詳細。',
  },
  'View All FAQs': {
    EN: 'View All FAQs',
    TH: 'ดูคำถามที่พบบ่อยทั้งหมด',
    KO: '모든 FAQ 보기',
    PT: 'Ver Todas as Perguntas',
    JA: 'すべてのFAQを見る',
  },

  // Final CTA Section
  'EXPERIENCE THE PREVIEW': {
    EN: 'EXPERIENCE THE PREVIEW',
    TH: 'สัมผัสประสบการณ์การจำลอง',
    KO: '시뮬레이션 미리보기 체험',
    PT: 'EXPERIMENTE A PRÉVIA',
    JA: 'プレビューを体験',
  },
  'Empower your consultations with visual certainty.': {
    EN: 'Empower your consultations with visual certainty.',
    TH: 'ยกระดับการให้คำปรึกษาของคุณด้วยความมั่นใจทางสายตา',
    KO: '시각적 확신으로 상담의 신뢰를 높이세요.',
    PT: 'Capacite suas consultas com certeza visual.',
    JA: '視覚的な確信でカウンセリングを強力にサポート。',
  },
  'Test 85+ procedure simulations directly in your web browser. 468 landmark tracking precision with zero software installation.': {
    EN: 'Test 85+ procedure simulations directly in your web browser. 468 landmark tracking precision with zero software installation.',
    TH: 'ทดสอบการจำลองหัตถการกว่า 85+ รายการได้โดยตรงในเว็บเบราว์เซอร์ของคุณ ติดตามจุดสังเกต 468 จุดโดยไม่ต้องติดตั้งซอฟต์แวร์',
    KO: '웹 브라우저에서 85개 이상의 시술 시뮬레이션을 직접 테스트하세요. 프로그램 설치 없이 468개 랜드마크 정밀 추적.',
    PT: 'Teste mais de 85 simulações direto no navegador. Precisão de 468 pontos com zero instalação de software.',
    JA: 'Webブラウザ上で85種類以上の施術シミュレーションをお試しください。アプリのインストール不要で468箇所の精密追跡。',
  },
  'Book Practice Demo': {
    EN: 'Book Practice Demo',
    TH: 'นัดหมายการสาธิตสำหรับคลินิก',
    KO: '클리닉 데모 신청',
    PT: 'Agendar Demonstração',
    JA: 'デモ体験を予約',
  },
  '• 100% On-Device Processing': {
    EN: '• 100% On-Device Processing',
    TH: '• ประมวลผลบนอุปกรณ์ 100%',
    KO: '• 100% 온디바이스 처리',
    PT: '• Processamento 100% no Dispositivo',
    JA: '• 100%端末内ローカル処理',
  },
  '• No Hardware Required': {
    EN: '• No Hardware Required',
    TH: '• ไม่ต้องใช้อุปกรณ์เสริม',
    KO: '• 특수 하드웨어 불필요',
    PT: '• Nenhum Hardware Necessário',
    JA: '• 専用機器の導入不要',
  },
  '• Mobile & iPad Optimized': {
    EN: '• Mobile & iPad Optimized',
    TH: '• รองรับมือถือและ iPad อย่างสมบูรณ์',
    KO: '• 모바일 및 iPad 완벽 최적화',
    PT: '• Otimizado para Celular e iPad',
    JA: '• スマートフォン・iPad対応',
  },

  // Footer
  'CONNECT WITH FACEIFY': {
    EN: 'CONNECT WITH FACEIFY',
    TH: 'ติดต่อกับ FACEIFY',
    KO: 'FACEIFY와 연결하기',
    PT: 'CONECTE-SE COM A FACEIFY',
    JA: 'FACEIFYへのお問い合わせ',
  },
  "We're always here when you need us.": {
    EN: "We're always here when you need us.",
    TH: 'เราพร้อมดูแลคุณเสมอเมื่อต้องการ',
    KO: '필요하실 때 언제나 곁에 있겠습니다.',
    PT: 'Estamos sempre aqui quando você precisar.',
    JA: '必要なときにいつでもサポートいたします。',
  },
  'Empowering aesthetic surgeons and patients worldwide with privacy-first visual planning tools.': {
    EN: 'Empowering aesthetic surgeons and patients worldwide with privacy-first visual planning tools.',
    TH: 'เสริมศักยภาพให้ศัลยแพทย์ความงามและคนไข้ทั่วโลกด้วยเครื่องมือวางแผนที่เน้นความเป็นส่วนตัว',
    KO: '프라이버시 우선 시각화 도구로 전 세계 미용 성형외과 의사와 환자를 지원합니다.',
    PT: 'Capacitando cirurgiões plásticos e pacientes em todo o mundo com ferramentas visuais que priorizam a privacidade.',
    JA: 'プライバシーを第一に考えたシミュレーションツールで、世界中の美容外科医と患者をサポート。',
  },
  'Product': {
    EN: 'Product',
    TH: 'ผลิตภัณฑ์',
    KO: '제품',
    PT: 'Produto',
    JA: '製品',
  },
  'Explore': {
    EN: 'Explore',
    TH: 'สำรวจ',
    KO: '탐색',
    PT: 'Explorar',
    JA: '探索',
  },
  'Company': {
    EN: 'Company',
    TH: 'บริษัท',
    KO: '회사',
    PT: 'Empresa',
    JA: '企業情報',
  },
  'Need Help?': {
    EN: 'Need Help?',
    TH: 'ต้องการความช่วยเหลือ?',
    KO: '도움이 필요하신가요?',
    PT: 'Precisa de Ajuda?',
    JA: 'サポートが必要ですか？',
  },
  'WhatsApp Priority': {
    EN: 'WhatsApp Priority',
    TH: 'WhatsApp สายด่วน',
    KO: 'WhatsApp 전용 채널',
    PT: 'WhatsApp Prioritário',
    JA: 'WhatsApp 優先窓口',
  },
  'All Procedures': {
    EN: 'All Procedures',
    TH: 'หัตถการทั้งหมด',
    KO: '모든 시술',
    PT: 'Todos os Procedimentos',
    JA: 'すべての施術',
  },
  'AI Simulator': {
    EN: 'AI Simulator',
    TH: 'เครื่องจำลอง AI',
    KO: 'AI 시뮬레이터',
    PT: 'Simulador de IA',
    JA: 'AIシミュレーター',
  },
  'Surgeon Registry': {
    EN: 'Surgeon Registry',
    TH: 'ทะเบียนศัลยแพทย์',
    KO: '의사 등록부',
    PT: 'Registro de Cirurgiões',
    JA: '認定医登録簿',
  },
  'Case Gallery': {
    EN: 'Case Gallery',
    TH: 'แกลเลอรีเคสตัวอย่าง',
    KO: '시술 갤러리',
    PT: 'Galeria de Casos',
    JA: '症例ギャラリー',
  },
  'Consultation': {
    EN: 'Consultation',
    TH: 'การปรึกษาแพทย์',
    KO: '상담 예약',
    PT: 'Consulta',
    JA: 'カウンセリング',
  },
  'Privacy Policy': {
    EN: 'Privacy Policy',
    TH: 'นโยบายความเป็นส่วนตัว',
    KO: '개인정보 처리방침',
    PT: 'Política de Privacidade',
    JA: 'プライバシーポリシー',
  },
  'Terms of Service': {
    EN: 'Terms of Service',
    TH: 'ข้อกำหนดการให้บริการ',
    KO: '이용 약관',
    PT: 'Termos de Serviço',
    JA: '利用規約',
  },
  'Refund Policy': {
    EN: 'Refund Policy',
    TH: 'นโยบายการคืนเงิน',
    KO: '환불 정책',
    PT: 'Política de Reembolso',
    JA: '返金ポリシー',
  },
  'Cancellation Policy': {
    EN: 'Cancellation Policy',
    TH: 'นโยบายการยกเลิก',
    KO: '취소 정책',
    PT: 'Política de Cancelamento',
    JA: 'キャンセル規約',
  },
  'Grievance Officer': {
    EN: 'Grievance Officer',
    TH: 'เจ้าหน้าที่รับเรื่องร้องเรียน',
    KO: '고충 처리 담당자',
    PT: 'Oficial de Reclamações',
    JA: '苦情対応責任者',
  },
  'Executive Director': {
    EN: 'Executive Director',
    TH: 'ผู้อำนวยการฝ่ายบริหาร',
    KO: '상임 이사',
    PT: 'Diretor Executivo',
    JA: 'マネージングディレクター',
  },
  'Blog': {
    EN: 'Blog',
    TH: 'บทความ',
    KO: '블로그',
    PT: 'Blog',
    JA: 'ブログ',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (text: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (text: string) => text,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('EN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('faceify_lang') as LanguageCode;
    if (saved && languages.some((l) => l.code === saved)) {
      setLanguageState(saved);
      document.documentElement.lang = languages.find((l) => l.code === saved)?.locale || 'en';
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('faceify_lang', lang);
      const opt = languages.find((l) => l.code === lang);
      if (opt) {
        document.documentElement.lang = opt.locale;
      }
    }
  };

  const t = useCallback((text: string, fallback?: string): string => {
    if (!text) return '';
    // Strict no change for English (default)
    if (language === 'EN') return fallback || text;

    const trimmed = text.trim();
    if (dictionary[trimmed] && dictionary[trimmed][language]) {
      return dictionary[trimmed][language];
    }

    return fallback || text;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
