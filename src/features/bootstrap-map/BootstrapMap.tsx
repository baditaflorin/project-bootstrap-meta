import { useQuery } from '@tanstack/react-query';
import {
  Check,
  Circle,
  ExternalLink,
  GitFork,
  GitBranch,
  Heart,
  RotateCcw,
  Sparkles,
  Star
} from 'lucide-react';
import { appMetadata } from '../../shared/metadata';
import { bootstrapPhases, projectPrinciples } from './bootstrapData';
import { getPhaseCompletion } from './progress';
import { useBootstrapProgress } from './useBootstrapProgress';

export function BootstrapMap() {
  const { data: phases = bootstrapPhases } = useQuery({
    queryKey: ['bootstrap-phases', appMetadata.version],
    queryFn: () => bootstrapPhases
  });

  const { progress, completed, total, percentComplete, errorMessage, toggleItem, markAll, reset } =
    useBootstrapProgress();

  return (
    <main className="min-h-screen bg-[#f7f7f0] text-[#17201b]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8">
        <header className="grid gap-5 border-b border-[#d9dccf] pb-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md border border-[#c7d2ca] bg-white px-3 py-1 text-xs font-bold uppercase text-[#0f766e]">
              <Sparkles aria-hidden="true" size={14} />
              GitHub Pages-first bootstrap map
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-[#16251d] sm:text-5xl">
              Project Bootstrap Meta
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#4a554d] sm:text-lg">
              A practical map for starting repos with deployment mode, ADRs, local checks, security,
              publishing, and postmortems already accounted for.
            </p>
          </div>

          <aside
            aria-label="Project progress"
            className="rounded-lg border border-[#d9dccf] bg-white p-4 shadow-sm"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#4a554d]">Bootstrap readiness</p>
                <p className="mt-1 text-3xl font-black text-[#17201b]">
                  {String(percentComplete)}%
                </p>
              </div>
              <p className="text-sm font-semibold text-[#0f766e]">
                {completed}/{total} checks
              </p>
            </div>
            <div
              aria-label={`${String(percentComplete)}% complete`}
              className="mt-4 h-3 overflow-hidden rounded-full bg-[#e4e6d9]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percentComplete}
            >
              <div
                className="h-full bg-[#0f766e]"
                style={{ width: `${String(percentComplete)}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#17201b] px-3 py-2 text-sm font-bold text-white hover:bg-[#2d3a32]"
                type="button"
                onClick={markAll}
              >
                <Check aria-hidden="true" size={16} />
                Complete
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#c7d2ca] bg-white px-3 py-2 text-sm font-bold text-[#17201b] hover:bg-[#eef0e8]"
                type="button"
                onClick={reset}
              >
                <RotateCcw aria-hidden="true" size={16} />
                Reset
              </button>
            </div>
          </aside>
        </header>

        <section aria-label="Project links" className="grid gap-3 md:grid-cols-3">
          <a
            className="group flex min-h-24 items-center justify-between gap-4 rounded-lg border border-[#c7d2ca] bg-white p-4 shadow-sm hover:border-[#0f766e]"
            href={appMetadata.repositoryUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span>
              <span className="flex items-center gap-2 text-sm font-bold text-[#17201b]">
                <GitBranch aria-hidden="true" size={18} />
                Star the repository
              </span>
              <span className="mt-2 block break-all text-sm leading-5 text-[#4a554d]">
                {appMetadata.repositoryUrl}
              </span>
            </span>
            <Star
              aria-hidden="true"
              className="shrink-0 text-[#d97706] transition-transform group-hover:scale-110"
              size={24}
            />
          </a>

          <a
            className="group flex min-h-24 items-center justify-between gap-4 rounded-lg border border-[#c7d2ca] bg-white p-4 shadow-sm hover:border-[#0f766e]"
            href={appMetadata.paypalUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span>
              <span className="flex items-center gap-2 text-sm font-bold text-[#17201b]">
                <Heart aria-hidden="true" size={18} />
                Support the work
              </span>
              <span className="mt-2 block break-all text-sm leading-5 text-[#4a554d]">
                {appMetadata.paypalUrl}
              </span>
            </span>
            <ExternalLink
              aria-hidden="true"
              className="shrink-0 text-[#0f766e] transition-transform group-hover:translate-x-1"
              size={22}
            />
          </a>

          <div className="min-h-24 rounded-lg border border-[#c7d2ca] bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-bold text-[#17201b]">
              <GitFork aria-hidden="true" size={18} />
              Published build
            </p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
              <dt className="font-semibold text-[#4a554d]">Version</dt>
              <dd className="font-mono text-[#17201b]">{appMetadata.version}</dd>
              <dt className="font-semibold text-[#4a554d]">Commit</dt>
              <dd className="break-all font-mono text-[#17201b]">{appMetadata.commit}</dd>
            </dl>
          </div>
        </section>

        {errorMessage ? (
          <section
            className="rounded-lg border border-[#f59e0b] bg-[#fffbeb] p-4 text-sm font-semibold text-[#92400e]"
            role="status"
          >
            {errorMessage}
          </section>
        ) : null}

        <section
          aria-label="Project principles"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          {projectPrinciples.map((principle) => (
            <div
              className="rounded-lg border border-[#d9dccf] bg-[#ffffffbf] p-3 shadow-sm"
              key={principle.label}
            >
              <principle.icon aria-hidden="true" className="text-[#0f766e]" size={18} />
              <p className="mt-3 text-xs font-bold uppercase text-[#5f695f]">{principle.label}</p>
              <p className="mt-1 text-lg font-black text-[#17201b]">{principle.value}</p>
            </div>
          ))}
        </section>

        <section aria-label="Bootstrap map" className="grid gap-4 lg:grid-cols-3">
          {phases.map((phase) => {
            const completion = getPhaseCompletion(phase, progress);

            return (
              <article
                className="flex min-h-[360px] flex-col rounded-lg border border-[#d9dccf] bg-white p-4 shadow-sm"
                key={phase.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase text-[#0f766e]">{phase.eyebrow}</p>
                    <h2 className="mt-2 text-xl font-black text-[#17201b]">{phase.title}</h2>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#eef0e8] text-[#0f766e]">
                    <phase.icon aria-hidden="true" size={22} />
                  </span>
                </div>
                <p className="mt-3 min-h-14 text-sm leading-6 text-[#4a554d]">
                  {phase.description}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <div
                    className="h-2 flex-1 overflow-hidden rounded-full bg-[#e4e6d9]"
                    role="progressbar"
                    aria-label={`${phase.title} completion`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={completion}
                  >
                    <div
                      className="h-full bg-[#2563eb]"
                      style={{ width: `${String(completion)}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-xs font-bold text-[#4a554d]">
                    {completion}%
                  </span>
                </div>

                <ul className="mt-4 flex flex-1 flex-col gap-3">
                  {phase.items.map((item) => {
                    const checked = Boolean(progress[item.id]);

                    return (
                      <li key={item.id}>
                        <button
                          className="grid w-full grid-cols-[28px_1fr] gap-3 rounded-md border border-[#d9dccf] bg-[#fbfcf7] p-3 text-left hover:border-[#0f766e] hover:bg-[#f3f5ed]"
                          type="button"
                          aria-pressed={checked}
                          onClick={() => toggleItem(item.id)}
                        >
                          <span
                            className={`mt-0.5 grid h-7 w-7 place-items-center rounded-full border ${
                              checked
                                ? 'border-[#0f766e] bg-[#0f766e] text-white'
                                : 'border-[#9aa394] bg-white text-[#6b766e]'
                            }`}
                          >
                            {checked ? (
                              <Check aria-hidden="true" size={16} />
                            ) : (
                              <Circle aria-hidden="true" size={12} />
                            )}
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-[#17201b]">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-[#4a554d]">
                              {item.detail}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </section>

        <footer className="flex flex-col gap-3 border-t border-[#d9dccf] py-6 text-sm text-[#4a554d] md:flex-row md:items-center md:justify-between">
          <p>
            Mode A static site. Version <span className="font-mono">{appMetadata.version}</span>,
            commit <span className="font-mono">{appMetadata.commit}</span>.
          </p>
          <p className="break-all">
            Live URL:{' '}
            <a className="font-bold text-[#0f766e] hover:text-[#115e59]" href={appMetadata.liveUrl}>
              {appMetadata.liveUrl}
            </a>
          </p>
        </footer>
      </section>
    </main>
  );
}
