//question object types

export const TYPE = "type"
export const FRAG = "fragment"
export const SCENARIO = "scenario"
export const IMAGE = "image"
export const TOPIC_KEY = "topic"
export const SUBTOPIC_KEY = "subtopic"
export const DATABASE_BRANCH = "questions"
export const TOPICS = {
    "1": "1: System Fundamentals",
    "2": "2: Computer Organization",
    "3": "3: Networks",
    "4": "4: Computational Thinking",
    "5": "5: Abstract Data Structures",
    "6": "6: Resource Management",
    "7": "7: Control",
    "D": "D: Object-Oriented Programming" }
export const TOPIC_1_SUB = ["1.1.1", "1.1.2", "1.1.3", "1.1.4", "1.1.5", 
                            "1.1.6", "1.1.7", "1.1.8", "1.1.9", "1.1.10", 
                            "1.1.11", "1.1.12", "1.1.13", "1.2.1", "1.2.2",
                            "1.2.3", "1.2.4", "1.2.5", "1.2.6", "1.2.7",
                            "1.2.8", "1.2.9", "1.2.10", "1.2.11", "1.2.12", 
                            "1.2.13", "1.2.14", "1.2.15", "1.2.16"]

export const TOP_1_SUB_DESC = {
    "1.1.1": "Identify the context for which a new system is planned.",
    "1.1.2": "Describe the need for change management.",
    "1.1.3": "Outline compatibility issues resulting from situations including legacy systems or business mergers.",
    "1.1.4": "Compare the implementation of systems using a client’s hardware with hosting systems remotely.",
    "1.1.5": "Evaluate alternative installation processes.",
    "1.1.6": "Discuss problems that may arise as a part of data migration.",
    "1.1.7": "Suggest various types of testing.",
    "1.1.8": "Describe the importance of user documentation.",
    "1.1.9": "Evaluate different methods of providing user documentation.",
    "1.1.10": "Evaluate different methods of delivering user training.",
    "1.1.11": "Identify a range of causes of data loss.",
    "1.1.12": "Outline the consequences of data loss in a specified situation.",
    "1.1.13": "Describe a range of methods that can be used to prevent data loss.",
    "1.1.14": "Describe strategies for managing releases and updates.",
    "1.2.1": "Define the terms: hardware, software, peripheral, network, human resources.",
    "1.2.2": "Describe the roles that a computer can take in a networked world.",
    "1.2.3": "Discuss the social and ethical issues associated with a networked world.",
    "1.2.4": "Identify the relevant stakeholders when planning a new system.",
    "1.2.5": "Describe methods of obtaining requirements from stakeholders.",
    "1.2.6": "Describe appropriate techniques for gathering the information needed to arrive at a workable solution.",
    "1.2.7": "Construct suitable representations to illustrate system requirements.",
    "1.2.8": "Describe the purpose of prototypes to demonstrate the proposed system to the client.",
    "1.2.9": "Discuss the importance of iteration during the design process.",
    "1.2.10": "Explain the possible consequences of failing to involve the end-user in the design process.",
    "1.2.11": "Discuss the social and ethical issues associated with the introduction of new IT systems.",
    "1.2.12": "Define the term usability.",
    "1.2.13": "Identify a range of usability problems with commonly used digital devices.",
    "1.2.14": "Identify methods that can be used to improve the accessibility of systems.",
    "1.2.15": "Identify a range of usability problems that can occur in a system.",
    "1.2.16": "Discuss the moral, ethical, social, economic and environmental implications of the interaction between humans and machines."
}

export const TOPIC_2_SUB = ["2.1.1", "2.1.2", "2.1.3", "2.1.4", "2.1.5", 
                            "2.1.6", "2.1.7", "2.1.8", "2.1.9", "2.1.10", 
                            "2.1.11", "2.1.12", "2.1.13"]
export const TOPIC_3_SUB = ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5", 
                            "3.1.6", "3.1.7", "3.1.8", "3.1.9", "3.1.10", 
                            "3.1.11", "3.1.12", "3.1.13", "3.1.14", "3.1.15", 
                            "3.1.16"]
export const TOPIC_4_SUB = ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5", 
                            "4.1.6", "4.1.7", "4.1.8", "4.1.9", "4.1.10", 
                            "4.1.11", "4.1.12","4.1.13",  "4.1.14", "4.1.15", 
                            "4.1.16", "4.1.17","4.1.18", "4.1.19", "4.1.20",
                            "4.2.1", "4.2.2", "4.2.3", "4.2.4", "4.2.5", 
                            "4.2.6", "4.2.7", "4.2.8", "4.2.9", 
                            "4.3.1", "4.3.2", "4.3.3", "4.3.4", "4.3.5", 
                            "4.3.6", "4.3.7", "4.3.8", "4.3.9", "4.3.10", 
                            "4.3.11", "4.3.12", "4.3.13"]
export const TOPIC_5_SUB = ["5.1.1", "5.1.2", "5.1.3", "5.1.4", "5.1.5", 
                            "5.1.6", "5.1.7", "5.1.8", "5.1.9", "5.1.10", 
                            "5.1.11", "5.1.12", "5.1.13", "5.1.14", "5.1.15", 
                            "5.1.16", "5.1.17", "5.1.18", "5.1.19", "5.1.20"]
export const TOPIC_6_SUB = ["6.1.1", "6.1.2", "6.1.3", "6.1.4", "6.1.5",
                            "6.1.6", "6.1.7", "6.1.8", "6.1.9"]
export const TOPIC_7_SUB = ["7.1.1", "7.1.2", "7.1.3", "7.1.4", "7.1.5", 
                            "7.1.6", "7.1.7", "7.1.8"]
export const TOPIC_D_SUB = ["D.1.1", "D.1.2", "D.1.3", "D.1.4", "D.1.5",
                            "D.1.6", "D.1.7", "D.1.8", "D.1.9", "D.1.10", 
                            "D.2.1", "D.2.2", "D.2.3", "D.2.4", "D.2.5", 
                            "D.2.6", "D.2.7", "D.2.8", "D.2.9", "D.2.10", 
                            "D.3.1", "D.3.2", "D.3.3", "D.3.4", "D.3.5", 
                            "D.3.6", "D.3.7", "D.3.8", "D.3.9", "D.3.10", 
                            "D.4.1", "D.4.2", "D.4.3", "D.4.4", "D.4.5", 
                            "D.4.6", "D.4.7", "D.4.8", "D.4.9", "D.4.10",
                            "D.4.11", "D.4.12", "D.4.13", "D.4.14", "D.4.15"]
export const TOPIC_SUBTOPIC_DICT = {"1": TOPIC_1_SUB,
                                    "2": TOPIC_2_SUB,
                                    "3": TOPIC_3_SUB,
                                    "4": TOPIC_4_SUB,
                                    "5": TOPIC_5_SUB,
                                    "6": TOPIC_6_SUB,
                                    "7": TOPIC_7_SUB,
                                    "D": TOPIC_D_SUB,}