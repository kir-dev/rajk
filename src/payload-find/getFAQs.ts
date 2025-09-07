import {getPayload} from "payload";
import config from "@payload-config";

export default async function getFAQs(locale = 'hu'){
    const payload = await getPayload({ config });
    const faqs = await payload.find({
        collection: "faqs",
        locale: "all"
    });

    // Process the FAQs data, handling localized fields
    const processedFAQs = faqs.docs.map((faq) => {
        // For localized fields, Payload returns an object with locale keys
        // Extract the question and answer for the current locale or fall back to default
        const question = typeof faq.question === 'object' ?
            (faq.question[locale] || faq.question['hu']) :
            faq.question;

        const answer = typeof faq.answer === 'object' ?
            (faq.answer[locale] || faq.answer['hu']) :
            faq.answer;

        return {
            id: faq.id,
            question: question,
            answer: answer
        };
    });

    return processedFAQs;
}