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
    "D": "D: Object-Oriented Programming"
}
export const TOPIC_1_SUB = ["1.1.1", "1.1.2", "1.1.3", "1.1.4", "1.1.5",
    "1.1.6", "1.1.7", "1.1.8", "1.1.9", "1.1.10",
    "1.1.11", "1.1.12", "1.1.13", "1.2.1", "1.2.2",
    "1.2.3", "1.2.4", "1.2.5", "1.2.6", "1.2.7",
    "1.2.8", "1.2.9", "1.2.10", "1.2.11", "1.2.12",
    "1.2.13", "1.2.14", "1.2.15", "1.2.16"]



export const TOPIC_1_DESC = {
    "1.1 Systems in organizations": {
        "Planning and system installation": {
            "1.1.1": "Identify the context for which a new system is planned.",
            "1.1.2": "Describe the need for change management.",
            "1.1.3": "Outline compatibility issues resulting from situations including legacy systems or business mergers.",
            "1.1.4": "Compare the implementation of systems using a client’s hardware with hosting systems remotely.",
            "1.1.5": "Evaluate alternative installation processes.",
            "1.1.6": "Discuss problems that may arise as a part of data migration.",
            "1.1.7": "Suggest various types of testing."
        },
        "User Focus": {
            "1.1.8": "Describe the importance of user documentation.",
            "1.1.9": "Evaluate different methods of providing user documentation.",
            "1.1.10": "Evaluate different methods of delivering user training."
        },
        "System Backup": {
            "1.1.11": "Identify a range of causes of data loss.",
            "1.1.12": "Outline the consequences of data loss in a specified situation.",
            "1.1.13": "Describe a range of methods that can be used to prevent data loss."
        },
        "Software Deployment": {
            "1.1.14": "Describe strategies for managing releases and updates."
        }
    },
    "1.2 System design basics": {
        "Components of a computer system": {
            "1.2.1": "Define the terms: hardware, software, peripheral, network, human resources.",
            "1.2.2": "Describe the roles that a computer can take in a networked world.",
            "1.2.3": "Discuss the social and ethical issues associated with a networked world.",
        },
        "System design and analysis": {
            "1.2.4": "Identify the relevant stakeholders when planning a new system.",
            "1.2.5": "Describe methods of obtaining requirements from stakeholders.",
            "1.2.6": "Describe appropriate techniques for gathering the information needed to arrive at a workable solution.",
            "1.2.7": "Construct suitable representations to illustrate system requirements.",
            "1.2.8": "Describe the purpose of prototypes to demonstrate the proposed system to the client.",
            "1.2.9": "Discuss the importance of iteration during the design process.",
            "1.2.10": "Explain the possible consequences of failing to involve the end-user in the design process.",
            "1.2.11": "Discuss the social and ethical issues associated with the introduction of new IT systems.",
        },
        "Human interaction with the system": {
            "1.2.12": "Define the term usability.",
            "1.2.13": "Identify a range of usability problems with commonly used digital devices.",
            "1.2.14": "Identify methods that can be used to improve the accessibility of systems.",
            "1.2.15": "Identify a range of usability problems that can occur in a system.",
            "1.2.16": "Discuss the moral, ethical, social, economic and environmental implications of the interaction between humans and machines."
        }
    }
}

export const TOPIC_2_DESC = {
    "2.1 Computer organization": {
        "Computer architecture": {
            "2.1.1": "Outline the architecture of the CPU, ALU, CU and registers.",
            "2.1.2": "Describe primary memory.",
            "2.1.3": "Explain the use of cache memory.",
            "2.1.4": "Explain the machine instruction cycle."
        },
        "Secondary Memory": {
            "2.1.5": "Identify the need for persistent storage."
        },
        "Operating systems and application systems": {
            "2.1.6": "Describe the main functions of an operating system.",
            "2.1.7": "Outline the use of a range of application software.",
            "2.1.8": "Identify common features of applications."
        },
        "Binary representation": {
            "2.1.9": "Define the terms: bit, byte, binary, denary/decimal, hexadecimal.",
            "2.1.10": "Outline the way in which data is represented in the computer."
        },
        "Simple logic gates": {
            "2.1.11": "Define the Boolean operators: AND, OR, NOT, NAND, NOR and XOR.",
            "2.1.12": "Construct truth tables using the above operators.",
            "2.1.13": "Construct a logic diagram using AND, OR, NOT, NAND, NOR and XOR gates."
        }
    }
}
export const TOPIC_3_DESC = {
    "3.1 Networks": {
        "Network fundamentals": {
            "3.1.1": "Identify different types of networks.",
            "3.1.2": "Outline the importance of standards in the construction of networks.",
            "3.1.3": "Describe how communication over networks is broken down into different layers.",
            "3.1.4": "Identify the technologies required to provide a VPN.",
            "3.1.5": "Evaluate the use of a VPN."
        },
        "Data transmission": {
            "3.1.6": "Define the terms: protocol, data packet.",
            "3.1.7": "Explain why protocols are necessary.",
            "3.1.8": "Explain why the speed of data transmission across a network can vary.",
            "3.1.9": "Explain why compression of data is often necessary when transmitting across a network.",
            "3.1.10": "Outline the characteristics of different transmission media.",
            "3.1.11": "Explain how data is transmitted by packet switching."
        },
        "Wireless networking": {
            "3.1.12": "Outline the advantages and disadvantages of wireless networks.",
            "3.1.13": "Describe the hardware and software components of a wireless network.",
            "3.1.14": "Describe the characteristics of wireless networks.",
            "3.1.15": "Describe the different methods of network security.",
            "3.1.16": "Evaluate the advantages and disadvantages of each method of network security."
        },
    }
}
export const TOPIC_4_DESC = {
    "4.1 General principles": {
        "Thinking procedurally": {
            "4.1.1": "Identify the procedure appropriate to solving a problem.",
            "4.1.2": "Evaluate whether the order in which activities are undertaken will result in the required outcome.",
            "4.1.3": "Explain the role of sub-procedures in solving a problem."
        },
        "Thinking logically": {
            "4.1.4": "Identify when decision-making is required in a specified situation.",
            "4.1.5": "Identify the decisions required for the solution to a specified problem.",
            "4.1.6": "Identify the condition associated with a given decision in a specified problem.",
            "4.1.7": "Explain the relationship between the decisions and conditions of a system.",
            "4.1.8": "Deduce logical rules for real-world situations."
        },
        "Thinking ahead": {
            "4.1.9": "Identify the inputs and outputs required in a solution.",
            "4.1.10": "Identify pre-planning in a suggested problem and solution.",
            "4.1.11": "Explain the need for pre-conditions when executing an algorithm.",
            "4.1.12": "Outline the pre- and post-conditions to a specified problem.",
            "4.1.13": "Identify exceptions that need to be considered in a specified problem solution."
        },
        "Thinking concurrently": {
            "4.1.14": "Identify the parts of a solution that could be implemented concurrently.",
            "4.1.15": "Describe how concurrent processing can be used to solve a problem.",
            "4.1.16": "Evaluate the decision to use concurrent processing in solving a problem."
        },
        "Thinking abstractly": {
            "4.1.17": "Identify examples of abstraction.",
            "4.1.18": "Explain why abstraction is required in the derivation of computational solutions for a specified situation.",
            "4.1.19": "Construct an abstraction from a specified situation.",
            "4.1.20": "Distinguish between a real-world entity and its abstraction."
        }
    },
    "4.2 Connecting computational thinking and program design": {
        "Algorithms":{
            "4.2.1": "Describe the characteristics of standard algorithms on linear arrays.",
            "4.2.2": "Outline the standard operations of collections.",
            "4.2.3": "Discuss an algorithm to solve a specific problem.",
            "4.2.4": "Analyse an algorithm presented as a flow chart.",
            "4.2.5": "Analyse an algorithm presented as pseudocode.",
            "4.2.6": "Construct pseudocode to represent an algorithm.",
            "4.2.7": "Suggest suitable algorithms to solve a specific problem.",
            "4.2.8": "Deduce the efficiency of an algorithm in the context of its use.",
            "4.2.9": "Determine the number of times a step in an algorithm will be performed for given input data."
        }
    },
    "4.3 Introduction to programming" : {
        "Nature of programming languages" : {
            "4.3.1": "State the fundamental operations of a computer.",
            "4.3.2": "Distinguish between fundamental and compound operations of a computer.",
            "4.3.3": "Explain the essential features of a computer language.",
            "4.3.4": "Explain the need for higher level languages.",
            "4.3.5": "Outline the need for a translation process from a higher level language to machine executable code."
        },
        "Use of programming languages" : {
            "4.3.6": "Define the terms: variable, constant, operator, object.",
            "4.3.7": "Define the operators =, ≠, <, <=, >, >=, mod, div.",
            "4.3.8": "Analyse the use of variables, constants and operators in algorithms.",
            "4.3.9": "Construct algorithms using loops, branching.",
            "4.3.10": "Describe the characteristics and applications of a collection.",
            "4.3.11": "Construct algorithms using the access methods of a collection.",
            "4.3.12": "Discuss the need for sub-programmes and collections within programmed solutions.",
            "4.3.13": "Construct algorithms using pre- defined sub-programmes, one- dimensional arrays and/or collections.",
        }
    }
}
export const TOPIC_5_DESC = {
    "5.1 Abstract data structures (HL)": {
        "Thinking recursively": {
            "5.1.1": "Identify a situation that requires the use of recursive thinking.",
            "5.1.2": "Identify recursive thinking in a specified problem solution.",
            "5.1.3": "Trace a recursive algorithm to express a solution to a problem."
        },
        "Abstract data structures": {
            "5.1.4": "Describe the characteristics of a two- dimensional array.",
            "5.1.5": "Construct algorithms using two- dimensional arrays.",
            "5.1.6": "Describe the characteristics and applications of a stack.",
            "5.1.7": "Construct algorithms using the access methods of a stack.",
            "5.1.8": "Describe the characteristics and applications of a queue.",
            "5.1.9": "Construct algorithms using the access methods of a queue.",
            "5.1.10": "Explain the use of arrays as static stacks and queues."
        },
        "Linked lists": {
            "5.1.11": "Describe the features and characteristics of a dynamic data structure.",
            "5.1.12": "Describe how linked lists operate logically.",
            "5.1.13": "Sketch linked lists (single, double and circular)."
        },
        "Trees": {
            "5.1.14": "Describe how trees operate logically (both binary and non-binary).",
            "5.1.15": "Define the terms: parent, left-child, right-child, subtree, root and leaf.",
            "5.1.16": "State the result of inorder, postorder and preorder tree traversal.",
            "5.1.17": "Sketch binary trees."
        },
        "Applications": {
            "5.1.18": "Define the term dynamic data structure.",
            "5.1.19": "Compare the use of static and dynamic data structures.",
            "5.1.20": "Suggest a suitable structure for a given situation."
        }
    }
}
export const TOPIC_6_DESC = {
    "6.1 Resource management (HL)": {
        "System resources": {
            "6.1.1": "Identify the resources that need to be managed within a computer system.",
            "6.1.2": "Evaluate the resources available in a variety of computer systems.",
            "6.1.3": "Identify the limitations of a range of resources in a specified computer system.",
            "6.1.4": "Describe the possible problems resulting from the limitations in the resources in a computer system."
        },
        "Role of the operating system": {
            "6.1.5": "Explain the role of the operating system in terms of managing memory, peripherals and hardware interfaces.",
            "6.1.7": "Outline OS resource management techniques: scheduling, policies, multitasking, virtual memory, paging, interrupt, polling.",
            "6.1.8": "Discuss the advantages of producing a dedicated operating system for a device.",
            "6.1.9": "Outline how an operating system hides the complexity of the hardware from users and applications."
        }
    }
}
export const TOPIC_7_DESC = {
    "7.1 Control (HL)": {
        "Centralized control systems": {
            "7.1.1": "Discuss a range of control systems.",
            "7.1.2": "Outline the uses of microprocessors and sensor input in control systems.",
            "7.1.3": "Evaluate different input devices for the collection of data in specified situations.",
            "7.1.4": "Explain the relationship between a sensor, the processor and an output transducer.",
            "7.1.5": "Describe the role of feedback in a control system.",
            "7.1.6": "Discuss the social impacts and ethical considerations associated with the use of embedded systems."
        },
        "Distributed systems": {
            "7.1.7": "Compare a centrally controlled system with a distributed system.",
            "7.1.8": "Outline the role of autonomous agents acting within a larger system."
        }
    }
}
export const TOPIC_D_DESC = {
    "D.1 Objects as a programming concept": {
        "Objects": {
            "D.1.1": "Outline the general nature of an object.",
            "D.1.2": "Distinguish between an object (definition, template or class) and instantiation.",
            "D.1.3": "Construct unified modelling language (UML) diagrams to represent object designs.",
            "D.1.4": "Interpret UML diagrams.",
            "D.1.5": "Describe the process of decomposition into several related objects.",
            "D.1.6": "Describe the relationships between objects for a given problem.",
            "D.1.7": "Outline the need to reduce dependencies between objects in a given problem.",
            "D.1.8": "Construct related objects for a given problem.",
            "D.1.9": "Explain the need for different data types to represent data items.",
            "D.1.10": "Describe how data items can be passed to and from actions as parameters."
        },
    },
    "D.2 Features of OOP" : {
        "Object Oriented Programming": {
            "D.2.1": "Define the term encapsulation.",
            "D.2.2": "Define the term inheritance.",
            "D.2.3": "Define the term polymorphism.",
            "D.2.4": "Explain the advantages of encapsulation.",
            "D.2.5": "Explain the advantages of inheritance.",
            "D.2.6": "Explain the advantages of polymorphism.",
            "D.2.7": "Describe the advantages of libraries of objects.",
            "D.2.8": "Describe the disadvantages of OOP.",
            "D.2.9": "Discuss the use of programming teams.",
            "D.2.10": "Explain the advantages of modularity in program development."
        }
    },
    "D.3 Program Development" : {
        "Programming in Java" : {
            "D.3.1": "Define the terms: class, identifier, primitive, instance variable, parameter variable, local variable.",
            "D.3.2": "Define the terms: method, accessor, mutator, constructor, signature, return value.",
            "D.3.3": "Define the terms: private, protected, public, extends, static.",
            "D.3.4": "Describe the uses of the primitive data types and the reference class string.",
            "D.3.5": "Construct code to implement assessment statements D.3.1–D.3.4.",
            "D.3.6": "Construct code examples related to selection statements.",
            "D.3.7": "Construct code examples related to repetition statements.",
            "D.3.8": "Construct code examples related to static arrays.",
            "D.3.9": "Discuss the features of modern programming languages that enable internationalization.",
            "D.3.10": "Discuss the ethical and moral obligations of programmers."
        }
    },
    "D.4 Advanced program development (HL)" : {
        "Recursion": {
            "D.4.1" : "Define the term recursion.",
            "D.4.2" : "Describe the application of recursive algorithms.",
            "D.4.3" : "Construct algorithms that use recursion.",
            "D.4.4" : "Trace recursive algorithms.",
        },
        "Object References": {
            "D.4.5": "Define the term object reference.",
            "D.4.6": "Construct algorithms that use reference mechanisms."
        },
        "Abstract Data Structures": {
            "D.4.7" : "Identify the features of the abstract data type (ADT) list.",
            "D.4.8" : "Describe applications of lists.",
            "D.4.9" : "Construct algorithms using a static implementation of a list.",
            "D.4.10" : "Construct list algorithms using object references.",
            "D.4.11" : "Construct algorithms using the standard library collections included in JETS.",
            "D.4.12" : "Trace algorithms using the implementations described in assessment statements D.4.9–D.4.11.",
            "D.4.13" : "Explain the advantages of using library collections.",
            "D.4.14" : "Outline the features of ADT’s stack, queue and binary tree.",
        },
        "Documentation and Style": {
            "D.4.15" : "Explain the importance of style and naming conventions in code."
        }
    }
}


export const TOPIC_DESCS = {
    "1": TOPIC_1_DESC,
    "2": TOPIC_2_DESC,
    "3": TOPIC_3_DESC,
    "4": TOPIC_4_DESC,
    "5": TOPIC_5_DESC,
    "6": TOPIC_6_DESC,
    "7": TOPIC_7_DESC,
    "D": TOPIC_D_DESC
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
    "4.1.11", "4.1.12", "4.1.13", "4.1.14", "4.1.15",
    "4.1.16", "4.1.17", "4.1.18", "4.1.19", "4.1.20",
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
export const TOPIC_SUBTOPIC_DICT = {
    "1": TOPIC_1_SUB,
    "2": TOPIC_2_SUB,
    "3": TOPIC_3_SUB,
    "4": TOPIC_4_SUB,
    "5": TOPIC_5_SUB,
    "6": TOPIC_6_SUB,
    "7": TOPIC_7_SUB,
    "D": TOPIC_D_SUB,
}