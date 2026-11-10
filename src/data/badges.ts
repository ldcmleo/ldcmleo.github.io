export interface BadgeItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    imageUrl: string;
    badgeUrl: string;
    description: string;
    skills: string[];
}

interface CredlyBadgeResponseItem {
    id: string;
    issued_at_date: string;
    issuer?: {
        summary?: string;
    };
    badge_template?: {
        name: string;
        description: string;
        image_url?: string;
        image?: {
            url?: string;
        };
        skills?: Array<{ name: string }>;
        issuer?: {
            entities?: Array<{
                entity?: {
                    name?: string;
                };
            }>;
        };
    };
}

const FALLBACK_BADGES: CredlyBadgeResponseItem[] = [
    {
        id: "cb6af01c-54c1-448a-b358-b10217d26b3c",
        issued_at_date: "2026-11-09",
        issuer: { summary: "issued by IBM" },
        badge_template: {
            name: "R for Data Science",
            description: "This badge earner has acquired core skills for using the R programming language with practical use-cases. This includes Understanding R syntax, assigning variables and performing simple operations using R's vector data structures. Demonstrated understanding of other key areas includes arrays and data frames, conditional statements, debugging, and reading and writing data in R.",
            image_url: "https://images.credly.com/images/baabff6f-1af4-4850-8036-e2d6787db9ec/blob",
            skills: [
                { name: "Data Analysis" },
                { name: "Data Science" },
                { name: "Data Visualization" },
                { name: "Machine Learning" },
                { name: "R" },
                { name: "Statistical Programming" },
                { name: "Statistics" }
            ],
            issuer: {
                entities: [{ entity: { name: "IBM" } }]
            }
        }
    },
    {
        id: "6d5f8f68-a52b-493a-976c-515bf874943b",
        issued_at_date: "2026-10-21",
        issuer: { summary: "issued by Universidad Tecmilenio" },
        badge_template: {
            name: "Computación en la Nube",
            description: "La persona acreditada es capaz de explicar los conceptos básicos y niveles de administración de servicios de la nube e identificar los diferentes escenarios de hospedaje de servicios gestionados en la nube para su uso en las organizaciones.",
            image_url: "https://images.credly.com/images/760e426f-e83e-449f-abf8-09268783968d/blob",
            skills: [
                { name: "Análisis De Problemas" },
                { name: "Computación En La Nube" },
                { name: "Tecnologías de información" }
            ],
            issuer: {
                entities: [{ entity: { name: "Universidad Tecmilenio" } }]
            }
        }
    },
    {
        id: "771b917e-e1d6-45ee-b161-078af8d7dfb2",
        issued_at_date: "2026-10-21",
        issuer: { summary: "issued by Universidad Tecmilenio" },
        badge_template: {
            name: "Fundamentos de Programación",
            description: "La persona acreditada es capaz de modelar soluciones utilizando un lenguaje de programación de alto nivel, además de analizar problemas computables básicos y plantear alternativas eficientes de solución.",
            image_url: "https://images.credly.com/images/3d0f4f79-5d6c-4273-ab9c-6e726add40ec/image.png",
            skills: [
                { name: "Análisis De Problemas" },
                { name: "Desarrollo De Software" },
                { name: "Ingenierías de datos y tecnologías" }
            ],
            issuer: {
                entities: [{ entity: { name: "Universidad Tecmilenio" } }]
            }
        }
    },
    {
        id: "4401cf35-0611-4104-b31c-6cb356157dd2",
        issued_at_date: "2026-09-21",
        issuer: { summary: "issued by Amazon Web Services Training and Certification" },
        badge_template: {
            name: "AWS Academy Graduate - Cloud Foundations - Training Badge",
            description: "Earners of this badge have taken the AWS Academy Cloud Foundations course.",
            image_url: "https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob",
            skills: [
                { name: "AWS Architecture" },
                { name: "AWS Cloud" },
                { name: "AWS Core Services" },
                { name: "AWS Pricing" },
                { name: "AWS Support" }
            ],
            issuer: {
                entities: [{ entity: { name: "Amazon Web Services Training and Certification" } }]
            }
        }
    },
    {
        id: "aa2fd796-ad6c-4e40-9c6e-5e07b609ee0b",
        issued_at_date: "2026-09-16",
        issuer: { summary: "issued by Cisco" },
        badge_template: {
            name: "Python Essentials 1",
            description: "Cisco, in collaboration with OpenEDG Python Institute, verifies the earner of this badge successfully completed the Python Essentials 1 course and achieved the student level credentials.",
            image_url: "https://images.credly.com/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
            skills: [
                { name: "Python" },
                { name: "Algorithmic Thinking" },
                { name: "Procedural Programming" },
                { name: "Analytical Thinking" }
            ],
            issuer: {
                entities: [{ entity: { name: "Cisco" } }]
            }
        }
    }
];

function formatBadgeDate(dateStr: string, lang: "es" | "en"): string {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const monthNum = parseInt(month, 10);
    const monthsEs = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const monthsEn = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = (lang === "es" ? monthsEs[monthNum - 1] : monthsEn[monthNum - 1]) || "";
    return `${monthName} ${year}`;
}

export async function getBadges(lang: "es" | "en" = "es"): Promise<BadgeItem[]> {
    const credlyUrl = "https://www.credly.com/users/2fd64e70-c3ff-43dd-af1c-7d79b9ea3c5e/badges.json";
    let rawItems: CredlyBadgeResponseItem[] = FALLBACK_BADGES;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(credlyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json?.data) && json.data.length > 0) {
                rawItems = json.data;
            }
        }
    } catch {
        // Fallback gracefully to offline cache snapshot
        rawItems = FALLBACK_BADGES;
    }

    return rawItems.map((item) => {
        const issuerName =
            item.badge_template?.issuer?.entities?.[0]?.entity?.name ||
            item.issuer?.summary?.replace(/^issued by\s+/i, "") ||
            "Credly Issuer";

        const imageUrl =
            item.badge_template?.image_url ||
            item.badge_template?.image?.url ||
            "";

        const skills = (item.badge_template?.skills || [])
            .map((s) => s.name)
            .filter((name) => !name.startsWith("PWID-"));

        return {
            id: item.id,
            title: item.badge_template?.name || "Insignia Digital",
            issuer: issuerName,
            date: formatBadgeDate(item.issued_at_date, lang),
            imageUrl,
            badgeUrl: `https://www.credly.com/badges/${item.id}/public_url`,
            description: item.badge_template?.description || "",
            skills
        };
    });
}
