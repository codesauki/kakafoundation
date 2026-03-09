'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X, ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NIGERIA_STATES, getLGANames, getWardsForLGA } from '@/data/nigeria-geo';

// ── VALIDATION SCHEMA ─────────────────────────────────────
const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Prefer not to say'], { required_error: 'Please select a gender' }),
  state: z.string().min(1, 'Please select your state'),
  lga: z.string().min(1, 'Please select your LGA'),
  ward: z.string().min(1, 'Please select your ward'),
  address: z.string().min(10, 'Please provide your full address').max(300),
  phone: z.string().regex(/^(\+234|0)[789][01]\d{8}$/, 'Enter a valid Nigerian phone number (e.g. 08012345678)'),
  guardianName: z.string().max(100).optional(),
  guardianPhone: z.string().optional(),
  schoolName: z.string().min(3, 'School name must be at least 3 characters').max(200),
  schoolState: z.string().min(1, 'Please select school state'),
  schoolLga: z.string().min(1, 'Please select school LGA'),
  classLevel: z.string().min(1, 'Please select your class / level'),
  examTypes: z.array(z.string()).min(1, 'Please select at least one examination type'),
  examYear: z.string().min(1, 'Please select examination year'),
  prevAttempts: z.coerce.number().min(0).max(10),
  statement: z.string().min(50, 'Please write at least 50 words about why you need this support').max(2000),
  declaration: z.boolean().refine((v) => v === true, { message: 'You must confirm that the information is accurate' }),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { title: 'Personal Information', desc: 'Your name, age, and contact details' },
  { title: 'Location Details', desc: 'Your state, LGA, and ward' },
  { title: 'Education Details', desc: 'Your school and examination information' },
  { title: 'Personal Statement', desc: 'Tell us why you need support' },
  { title: 'Review & Submit', desc: 'Check everything before submitting' },
];

const CLASS_LEVELS = ['JSS 1','JSS 2','JSS 3','SSS 1','SSS 2','SSS 3','100 Level','200 Level','300 Level','400 Level','500 Level','Awaiting Placement','Other'];
const EXAM_TYPES = ['JAMB','WAEC','NECO'];
const EXAM_YEARS = ['2025','2026','2027'];

export default function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { examTypes: [], prevAttempts: 0, declaration: false },
  });

  const watchState = watch('state');
  const watchSchoolState = watch('schoolState');
  const watchLga = watch('lga');
  const watchExamTypes = watch('examTypes');

  const stateLGAs = watchState ? getLGANames(watchState) : [];
  const wards = (watchState && watchLga) ? getWardsForLGA(watchState, watchLga) : [];
  const schoolLGAs = watchSchoolState ? getLGANames(watchSchoolState) : [];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Photo must be smaller than 2MB'); return; }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const toggleExamType = (type: string) => {
    const current = watchExamTypes ?? [];
    if (current.includes(type)) {
      setValue('examTypes', current.filter((t) => t !== type), { shouldValidate: true });
    } else {
      setValue('examTypes', [...current, type], { shouldValidate: true });
    }
  };

  const STEP_FIELDS: (keyof FormData)[][] = [
    ['firstName', 'lastName', 'dateOfBirth', 'gender', 'phone'],
    ['state', 'lga', 'ward', 'address'],
    ['schoolName', 'schoolState', 'schoolLga', 'classLevel', 'examTypes', 'examYear'],
    ['statement'],
    ['declaration'],
  ];

  const nextStep = async () => {
    const valid = await trigger(STEP_FIELDS[step] as any);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, Array.isArray(v) ? v.join(',') : String(v));
      });
      if (photoFile) formData.append('photo', photoFile);

      const res = await fetch('/api/applications', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');

      router.push(`/apply/success?ref=${json.refNumber}`);
    } catch (err: any) {
      setServerError(err.message ?? 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const values = watch();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className={cn(
                'w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300',
                i < step ? 'bg-teal-500 border-teal-500 text-white' :
                i === step ? 'border-teal-500 text-teal-600 bg-teal-50' :
                'border-navy-200 text-navy-300 bg-white'
              )}>
                {i < step ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
              <span className={cn('text-xs text-center font-medium hidden sm:block', i === step ? 'text-teal-600' : i < step ? 'text-teal-500' : 'text-navy-300')}>
                {s.title.split(' ')[0]}
              </span>
              {i < STEPS.length - 1 && (
                <div className="absolute" style={{ display: 'none' }} />
              )}
            </div>
          ))}
        </div>
        <div className="relative h-1.5 bg-navy-100 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-teal-gradient rounded-full transition-all duration-500" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
        </div>
        <div className="mt-3">
          <h2 className="font-display text-xl text-navy-800 font-semibold">{STEPS[step].title}</h2>
          <p className="text-navy-400 text-sm">{STEPS[step].desc}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* ── STEP 0: Personal Info ─────────────────────────── */}
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">First Name <span className="text-red-400">*</span></label>
                <input {...register('firstName')} className={cn('input', errors.firstName && 'input-error')} placeholder="e.g. Amina" />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="label">Middle Name <span className="text-navy-300 font-normal">(optional)</span></label>
                <input {...register('middleName')} className="input" placeholder="e.g. Fatima" />
              </div>
            </div>

            <div>
              <label className="label">Last Name / Surname <span className="text-red-400">*</span></label>
              <input {...register('lastName')} className={cn('input', errors.lastName && 'input-error')} placeholder="e.g. Ibrahim" />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Date of Birth <span className="text-red-400">*</span></label>
                <input type="date" {...register('dateOfBirth')} className={cn('input', errors.dateOfBirth && 'input-error')}
                  max={new Date(new Date().getFullYear() - 10).toISOString().split('T')[0]} />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <label className="label">Gender <span className="text-red-400">*</span></label>
                <select {...register('gender')} className={cn('select', errors.gender && 'input-error')}>
                  <option value="">-- Select gender --</option>
                  {['Male', 'Female', 'Prefer not to say'].map((g) => <option key={g}>{g}</option>)}
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
            </div>

            <div>
              <label className="label">Phone Number <span className="text-red-400">*</span></label>
              <input {...register('phone')} className={cn('input', errors.phone && 'input-error')} placeholder="e.g. 08012345678" type="tel" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              <p className="text-navy-400 text-xs mt-1">This number will be used to contact you about your application.</p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-700 text-sm font-semibold mb-3">Under 18? Guardian Details Required</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label text-xs">Guardian / Parent Name</label>
                  <input {...register('guardianName')} className="input text-sm" placeholder="Full name" />
                </div>
                <div>
                  <label className="label text-xs">Guardian Phone</label>
                  <input {...register('guardianPhone')} className="input text-sm" placeholder="Phone number" type="tel" />
                </div>
              </div>
            </div>

            <div>
              <label className="label">Passport Photograph <span className="text-navy-300 font-normal">(optional)</span></label>
              {photoPreview ? (
                <div className="flex items-center gap-4">
                  <Image src={photoPreview} alt="Preview" width={80} height={80} className="rounded-xl object-cover border-2 border-teal-200" />
                  <button type="button" onClick={() => { setPhotoPreview(null); setPhotoFile(null); }}
                    className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-navy-200 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-200">
                  <Upload className="w-8 h-8 text-navy-300" />
                  <span className="text-sm text-navy-500 font-medium">Click to upload photo</span>
                  <span className="text-xs text-navy-400">JPEG or PNG, max 2MB</span>
                  <input type="file" accept="image/jpeg,image/png" onChange={handlePhotoChange} className="sr-only" />
                </label>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 1: Location ─────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl text-sm text-teal-700">
              📍 Please provide your <strong>permanent home address and origin</strong> — not your school address.
            </div>

            <div>
              <label className="label">State of Origin <span className="text-red-400">*</span></label>
              <select {...register('state')} className={cn('select', errors.state && 'input-error')}
                onChange={(e) => { setValue('state', e.target.value); setValue('lga', ''); setValue('ward', ''); }}>
                <option value="">-- Select state --</option>
                {NIGERIA_STATES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>

            <div>
              <label className="label">Local Government Area <span className="text-red-400">*</span></label>
              <select {...register('lga')} className={cn('select', errors.lga && 'input-error')} disabled={!watchState}
                onChange={(e) => { setValue('lga', e.target.value); setValue('ward', ''); }}>
                <option value="">{watchState ? '-- Select LGA --' : 'Select state first'}</option>
                {stateLGAs.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              {errors.lga && <p className="text-red-500 text-xs mt-1">{errors.lga.message}</p>}
            </div>

            <div>
              <label className="label">Ward <span className="text-red-400">*</span></label>
              <select {...register('ward')} className={cn('select', errors.ward && 'input-error')} disabled={!watchLga}>
                <option value="">{watchLga ? '-- Select ward --' : 'Select LGA first'}</option>
                {wards.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
              {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward.message}</p>}
            </div>

            <div>
              <label className="label">Home Address <span className="text-red-400">*</span></label>
              <textarea {...register('address')} className={cn('textarea', errors.address && 'input-error')}
                placeholder="Street name, house number, nearest landmark, town..." rows={3} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
          </div>
        )}

        {/* ── STEP 2: Education ────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="label">School Name <span className="text-red-400">*</span></label>
              <input {...register('schoolName')} className={cn('input', errors.schoolName && 'input-error')}
                placeholder="e.g. Government Secondary School, Damaturu" />
              {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">School State <span className="text-red-400">*</span></label>
                <select {...register('schoolState')} className={cn('select', errors.schoolState && 'input-error')}
                  onChange={(e) => { setValue('schoolState', e.target.value); setValue('schoolLga', ''); }}>
                  <option value="">-- Select state --</option>
                  {NIGERIA_STATES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
                {errors.schoolState && <p className="text-red-500 text-xs mt-1">{errors.schoolState.message}</p>}
              </div>
              <div>
                <label className="label">School LGA <span className="text-red-400">*</span></label>
                <select {...register('schoolLga')} className={cn('select', errors.schoolLga && 'input-error')} disabled={!watchSchoolState}>
                  <option value="">{watchSchoolState ? '-- Select LGA --' : 'Select state first'}</option>
                  {schoolLGAs.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.schoolLga && <p className="text-red-500 text-xs mt-1">{errors.schoolLga.message}</p>}
              </div>
            </div>

            <div>
              <label className="label">Current Class / Level <span className="text-red-400">*</span></label>
              <select {...register('classLevel')} className={cn('select', errors.classLevel && 'input-error')}>
                <option value="">-- Select class / level --</option>
                {CLASS_LEVELS.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.classLevel && <p className="text-red-500 text-xs mt-1">{errors.classLevel.message}</p>}
            </div>

            <div>
              <label className="label">Applying for Examination(s) <span className="text-red-400">*</span> <span className="text-navy-300 font-normal">(select all that apply)</span></label>
              <div className="flex gap-3 flex-wrap mt-2">
                {EXAM_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleExamType(type)}
                    className={cn(
                      'px-5 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-200',
                      (watchExamTypes ?? []).includes(type)
                        ? 'bg-teal-500 border-teal-500 text-white shadow-teal'
                        : 'bg-white border-navy-200 text-navy-500 hover:border-teal-300 hover:text-teal-600'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.examTypes && <p className="text-red-500 text-xs mt-1">{errors.examTypes.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Examination Year <span className="text-red-400">*</span></label>
                <select {...register('examYear')} className={cn('select', errors.examYear && 'input-error')}>
                  <option value="">-- Select year --</option>
                  {EXAM_YEARS.map((y) => <option key={y}>{y}</option>)}
                </select>
                {errors.examYear && <p className="text-red-500 text-xs mt-1">{errors.examYear.message}</p>}
              </div>
              <div>
                <label className="label">Previous Attempts</label>
                <select {...register('prevAttempts')} className="select">
                  {[0,1,2,3,4,5].map((n) => <option key={n} value={n}>{n === 0 ? 'First attempt' : `${n} previous attempt${n > 1 ? 's' : ''}`}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Statement ────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="p-4 bg-gold-50 border border-gold-200 rounded-xl">
              <p className="text-gold-700 text-sm font-semibold mb-1">📝 Your Personal Statement</p>
              <p className="text-gold-600 text-xs">Tell us in your own words why you need financial support for your examinations. Be honest and specific. This is your opportunity to be heard. Minimum 50 characters.</p>
            </div>
            <div>
              <label className="label">Why do you need this support? <span className="text-red-400">*</span></label>
              <textarea {...register('statement')} className={cn('textarea min-h-[200px]', errors.statement && 'input-error')}
                placeholder="My name is... I am applying because... My family situation is... I believe that with this support I can..."
                rows={8} />
              <div className="flex justify-between mt-1">
                {errors.statement
                  ? <p className="text-red-500 text-xs">{errors.statement.message}</p>
                  : <p className="text-navy-400 text-xs">Write at least 50 characters</p>}
                <p className="text-navy-300 text-xs">{watch('statement')?.length ?? 0} / 2000</p>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Review ───────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="card p-5 space-y-4">
              <h3 className="font-display text-lg text-navy-800 font-semibold border-b border-navy-100 pb-3">Review Your Application</h3>

              {[
                { title: 'Personal', items: [
                  ['Full Name', `${values.firstName} ${values.middleName ?? ''} ${values.lastName}`.trim()],
                  ['Date of Birth', values.dateOfBirth], ['Gender', values.gender], ['Phone', values.phone],
                ]},
                { title: 'Location', items: [
                  ['State', values.state], ['LGA', values.lga], ['Ward', values.ward],
                ]},
                { title: 'Education', items: [
                  ['School', values.schoolName], ['Class/Level', values.classLevel],
                  ['Examinations', (values.examTypes ?? []).join(', ')], ['Year', values.examYear],
                ]},
              ].map((section) => (
                <div key={section.title}>
                  <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">{section.title}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {section.items.map(([label, value]) => (
                      <div key={label}>
                        <div className="text-xs text-navy-400">{label}</div>
                        <div className="text-sm text-navy-700 font-medium">{value || '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Declaration */}
            <div className="p-5 bg-cream-100 border border-navy-100 rounded-2xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" {...register('declaration')} className="mt-1 w-4 h-4 accent-teal-500 shrink-0" />
                <span className="text-navy-600 text-sm leading-relaxed">
                  I, <strong>{values.firstName} {values.lastName}</strong>, hereby declare that all information provided in this application is true, complete, and accurate to the best of my knowledge. I understand that providing false information will result in immediate disqualification and may be reported to relevant authorities.
                </span>
              </label>
              {errors.declaration && <p className="text-red-500 text-xs mt-2 ml-7">{errors.declaration.message}</p>}
            </div>

            {serverError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{serverError}</p>
              </div>
            )}
          </div>
        )}

        {/* ── NAVIGATION ───────────────────────────────────── */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-100">
          <button type="button" onClick={prevStep} disabled={step === 0}
            className={cn('flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors', step === 0 && 'invisible')}>
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="btn-gold px-8 py-3 text-base disabled:opacity-60">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-navy-900/30 border-t-navy-900 animate-spin" />
                  Submitting…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Submit Application <CheckCircle className="w-5 h-5" />
                </span>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
