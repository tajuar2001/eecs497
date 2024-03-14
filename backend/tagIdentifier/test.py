from gensim.models import KeyedVectors

# Load the pre-trained Google News word2vec model
print("Loading the pre-trained Google News word2vec model...")
model_path = 'model/GoogleNews-vectors-negative300.bin'
model = KeyedVectors.load_word2vec_format(model_path, binary=True)
print("Model loaded successfully!")

def get_word_similarity(word1, word2):
    try:
        # Calculate the similarity between two words
        similarity = model.similarity(word1, word2)
        return similarity
    except KeyError as e:
        print(f"Error: One or both of the words '{word1}' and '{word2}' are not in the vocabulary.")
        return None

if __name__ == "__main__":
    while True:
        word1 = input("Enter the first word (or 'exit' to quit): ")
        if word1.lower() == 'exit':
            break

        word2 = input("Enter the second word: ")

        similarity = get_word_similarity(word1, word2)
        if similarity is not None:
            print(f"Similarity between '{word1}' and '{word2}': {similarity:.4f}")