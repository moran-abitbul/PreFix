from Questgen import main
from pprint import pprint

str = "Criminal law: A competent authority (in charge of enforcing a law) accuses a person or corporation or other governmental authority of violating state laws and / or bylaws and / or regulations. Civil Law: Includes quite a few industries and the most prominent of which are contract law, tort law, labor law, family law, property law, corporate law and private international law. The parties to civil law are plaintiff and defendant (including corporations as well as bodies and governmental authorities operating in the civil field, such as contract and tort matters). Administrative Law: Administrative law regulates the actions of the governing authorities acting by virtue of law. A person / corporation petitions the court for relief against the governing body."
#str = "An online platform that provides an innovative learning experience by changing and upgrading a textual presentation to an interactive presentation. The system analyzes and adapts the visual characteristics to the human eye, offers a variety of additions that contribute to conveying messages in a clear and fascinating way, such as videos, pictures and builds question games that make the lesson interactive, fun and thus increase learner involvement."
#str = "Machine Learning Allow the computer to learn from examples Variety of computational tasks where classic programming is not possible Supervised Learning Unsupervised Learning Reinforcement LearningData Set Data For Learning Examples – with or without '“results”' Occam’s Razor prefer a simple model if possible Machine Learning Text Mining Description Definitions Methods Learning Algorithm Text mining for market prediction Conclusions Technology development Documents go digital Need to search for information digitally Strong field, a lot of money, very popular Raising $ 18 million for an artificial intelligence platform of text mining Description How can a main idea be extracted from the text? How can text documents be classified? A variety of words many documents rapid growth of the World Wide Web Problem! Definitions Generalize to new examples The ability of the model to properly adapt to previously unseen data Dimensionality Reduction Data from a high-dimensional space into a low-dimensional NLP – Natural Language Processing "
#str = ' Machine Learning: Allow the computer to learn from examples. Runs on a variety of computational tasks where classic programming is not possible. Supervised Learning. Unsupervised Learning. Reinforcement Learning.'
payload = {
    "input_text": str,
    "max_questions": 5
    # "input_text": "A tort is a civil wrong[1] (other than breach of contract) that causes a claimant to suffer loss or harm, resulting in legal liability for the person who commits the tortious act. In some, but not all, civil and mixed law jurisdictions, the term delict is used to refer to this category of civil wrong, though it can also refer to criminal offences in some jurisdictions and tort is the general term used in comparative law.[a] The word tort stems from Old French via the Norman Conquest and Latin via the Roman Empire.[3] The word tort was first used in a legal context in the 1580s,[b] although different words were used for similar concepts prior to this time. Tort law involves claims in an action seeking to obtain a private civil remedy, typically monetary damages. A tort claim can include intentional infliction of emotional distress, negligence, financial loss, injury, invasion of privacy, and numerous other harms. Tort claims may be compared to criminal law, which deals with criminal wrongs that are punishable by the state. A wrongful act, such as an assault and battery, may result in both a civil lawsuit and a criminal prosecution in countries where the civil and criminal legal systems are separate. Tort law may also be contrasted with contract law, which also provides civil remedies after breach of a duty that arises from a contract; but whereas the contractual obligation is one agreed to by the parties, obligations in both tort and criminal law are more fundamental and are imposed regardless of whether the parties have a contract.[citation needed] In both contract and tort, successful claimants must show that they have suffered foreseeable loss or harm as a direct result of the breach of duty.[c][d]"
}

#Bullet
# qe = main.BoolQGen()
# output = qe.predict_boolq(payload)

qg = main.QGen()
output = qg.paraphrase(payload)

# answer
# answer = main.AnswerPredictor()
# payload3 = {
#     "input_text" : '''A tort is a civil wrong[1] (other than breach of contract) that causes a claimant to suffer loss or harm, resulting in legal liability for the person who commits the tortious act. In some, but not all, civil and mixed law jurisdictions, the term delict is used to refer to this category of civil wrong, though it can also refer to criminal offences in some jurisdictions and tort is the general term used in comparative law.[a] The word tort stems from Old French via the Norman Conquest and Latin via the Roman Empire.[3] The word 'tort' was first used in a legal context in the 1580s,[b] although different words were used for similar concepts prior to this time..''',
#     "input_question" : "What is a tort ? "

# }
# output = answer.predict_answer(payload3)

pprint(output)

