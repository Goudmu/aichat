import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const testimonials = [
  {
    name: "John Doe",
    avatar: "https://example.com/avatars/john_doe.jpg",
    title: "Software Engineer",
    description:
      "This chatbot has revolutionized the way I handle customer queries. It's efficient and incredibly user-friendly.",
  },
  {
    name: "Jane Smith",
    avatar: "https://example.com/avatars/jane_smith.jpg",
    title: "Marketing Manager",
    description:
      "The chatbot's responses are quick and accurate. It has significantly improved our customer engagement.",
  },
  {
    name: "Alice Johnson",
    avatar: "https://example.com/avatars/alice_johnson.jpg",
    title: "Product Manager",
    description:
      "Integrating this chatbot into our system was seamless, and it has enhanced our customer support experience.",
  },
  {
    name: "Bob Brown",
    avatar: "https://example.com/avatars/bob_brown.jpg",
    title: "Customer Support Specialist",
    description:
      "I've seen a noticeable decrease in response times and an increase in customer satisfaction since we started using the chatbot.",
  },
  {
    name: "Eve Wilson",
    avatar: "https://example.com/avatars/eve_wilson.jpg",
    title: "Sales Director",
    description:
      "This chatbot has been a game-changer for our sales team. It's like having an extra team member who works around the clock.",
  },
];

const LandingContent = () => {
  return (
    <div className=" px-10 pb-20">
      <h2 className=" text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className=" bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className=" text-lg">{testimonial.name}</p>
                  <p className=" text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className=" pt-4 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
