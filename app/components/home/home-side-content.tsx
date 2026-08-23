import { card } from "@/app/lib/site";
import Link from "next/link";
import { Icon } from "../icon";

export function HomeSideContent() {
    return(
        <aside className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1">
                        <div className={`${card} flex flex-col gap-4`}>
                            <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
                                <Icon name="tag" />
                                Explore by Category
                            </div>
        
                            <div className="flex flex-col gap-[11.5px]">
                                {[
                                    ["#ai", "bot", "Artificial Intelligence", "28"],
                                    ["#web", "globe", "Web Development", "42"],
                                    ["#apps", "smartphone", "App Development", "35"],
                                    ["#tools", "settings", "Developer Tools", "18"],
                                    ["#software", "archive", "Software & Apps", "25"],
                                    ["#guides", "book", "Tech Guides", "30"],
                                ].map(([href, icon, label, count]) => (
                                    <Link
                                        key={href}
                                        href={`/${href}`}
                                        className="flex items-center justify-between text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text-primary)]"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={15} />
                                            <span>{label}</span>
                                        </div>
                                        <span className="rounded bg-[var(--badge-bg)] px-2 py-0.5 text-xs text-[var(--text-secondary)]">
                                            {count}
                                        </span>
                                    </Link>
                                ))}
                            </div>
        
                            <Link
                                href="/blog"
                                className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-[var(--border)] bg-transparent p-[9px] text-sm font-medium text-[var(--text-primary)] no-underline transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
                            >
                                View All Categories →
                            </Link>
                        </div>
                        <div className={`${card} flex flex-col gap-1`}>
                            <div className="text-xs font-semibold text-[var(--accent-purple)]">
                                Stay in the Loop
                            </div>
        
                            <div className="mb-1 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
                                <Icon name="mail" />
                                Get the Best of Tech, Straight to Your Inbox
                            </div>
        
                            <p className="mb-3 text-xs leading-snug text-[var(--text-secondary)]">
                                Get our latest AI guides, developer tutorials, and software
                                recommendations delivered directly to your inbox.
                            </p>
        
                            <p className="text-center text-[10px] leading-normal text-[var(--text-secondary)]">
                                No spam. Just useful tech content. Unsubscribe anytime.
                            </p>
                        </div>
                    </aside>
    )
}