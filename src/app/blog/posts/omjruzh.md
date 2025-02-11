- [1. Omjruzh](#1-omjruzh)
  - [1.2. Consonant Mapping](#12-consonant-mapping)
  - [1.3. Vowel Mapping](#13-vowel-mapping)
  - [1.4. Special Rules \& Exceptions](#14-special-rules--exceptions)
    - [1.4.1. Soft/Hard Variant Standardization](#141-softhard-variant-standardization)
    - [1.4.2. The Letter C](#142-the-letter-c)
    - [1.4.3. And Sometimes W](#143-and-sometimes-w)
    - [1.4.4. Final-Word "E" Rule](#144-final-word-e-rule)
    - [1.4.5. Past Tense "ed" Mapping](#145-past-tense-ed-mapping)
    - [1.4.6. Adjustments for Initial Consonant Clusters](#146-adjustments-for-initial-consonant-clusters)
    - [1.4.7. Nasal and Affricate Combinations](#147-nasal-and-affricate-combinations)
    - [1.4.8. Phonotactic Smoothing with Schwa (ə)](#148-phonotactic-smoothing-with-schwa-ə)
    - [1.4.9. Digraph and Phonetic Combination Rule](#149-digraph-and-phonetic-combination-rule)
    - [1.4.10. Reversibility of Mappings](#1410-reversibility-of-mappings)
    - [1.4.11. Orthographic Emphasis on Intended Pronunciation](#1411-orthographic-emphasis-on-intended-pronunciation)
  - [1.5. Additional Considerations](#15-additional-considerations)
    - [1.5.1. Silent Letters](#151-silent-letters)
    - [1.5.2. Final "-le" Mapping](#152-final--le-mapping)
  - [1.6. Transformation Process Overview](#16-transformation-process-overview)
  - [1.7. Example Transformation: "english" → "omjruzh"](#17-example-transformation-english--omjruzh)
  - [1.8. Summary](#18-summary)

# 1. Omjruzh

Omjruzh is a **phonetic cipher** that systematically transforms English words by swapping vowels and consonants based on defined phonetic oppositions. Every mapping also works in both directions.

Once a word is transformed into its written form using these rules, it is then read aloud the way a native English speaker would read the resulting word. Thus, the final vocalization may not be a strict phonetic match to the original sounds.

> **Note:** Silent letters (such as the **k** in _know_ or the **h** in _what_) are ignored in the transformation process.

---

## 1.2. Consonant Mapping

Each consonant is replaced by its “opposite” according to its place or manner of articulation. All mappings are reversible:

- **m → n**  
  _(Bilabial nasal becomes alveolar nasal.)_  
  **Reverse:** **n → m**
- **d, t, soft th, hard th → b, p, dh, f**
  - **d (voiced alveolar stop) → b (voiced bilabial stop)**  
    **Reverse:** **b → d**
  - **t (voiceless alveolar stop) → p (voiceless bilabial stop)**  
    **Reverse:** **p → t**
  - **soft th (/ð/), represented as `dh` → dh**  
    **Reverse:** **dh → soft th (/ð/)**
  - **hard th (/θ/) → f (voiceless labiodental fricative)**  
    **Reverse:** **f → hard th (/θ/)**
- **Affricates:**
  - **j → g**  
    _(Voiced postalveolar affricate maps to g.)_  
    **Reverse:** **g → j**
  - **ch → ch**  
    _(Voiceless postalveolar affricate remains **ch** to ensure it is pronounced /tʃ/ ("tch") rather than /k/.)_  
    **Reverse:** **ch → ch**
- **y → w**  
  _(Semi-vowel swap; note that **w** may be pronounced like “oo” in some contexts.)_  
  **Reverse:** **w → y**
- **l → r**  
  _(Lateral approximant becomes rhotic.)_  
  **Reverse:** **r → l**
- **h → h**  
  _(Remains unchanged.)_
- **x → x**  
  _(Remains unchanged in writing, but is pronounced “ps” as in “maps.”)_

---

## 1.3. Vowel Mapping

The vowels are remapped based on their articulatory features. The mappings are reversible:

- **a → a**  
  _(Remains unchanged.)_
- **i → u**  
  _(High front vowel becomes high back vowel.)_  
  **Reverse:** **u → i**
- **o → e**  
  _(The mid/low back vowel becomes a mid front vowel.)_  
  **Reverse:** **e → o**

---

## 1.4. Special Rules & Exceptions

### 1.4.1. Soft/Hard Variant Standardization

- The cipher **standardizes** soft and hard variants:
  - A soft **g** is always represented as **j**.
  - A soft **s** is always represented as **z**.
  - A soft **sh** is always rendered as **zh**.
  - _Hard and soft **th** (θ and /ð/) are preserved as indicated, with soft th represented as `dh`._

### 1.4.2. The Letter C

- **c** is treated based on its pronunciation in the word (i.e., whether it sounds like /s/ or /k/).
- There is no separate mapping for a “see” sound.

### 1.4.3. And Sometimes W

In this omjruzh, the letter **w** is treated as reversible with **y** (i.e. **w ↔ y**). This is because both **w** and **y** often function as semi-vowels in English and share similar phonetic roles in certain contexts. For example, in some positions **w** can carry a vowel-like quality (as in the "oo" sound), much like **y** can represent a vowel sound (as in "happy"). By mapping **w** to **y** (and vice versa), we maintain a balanced, reversible system that mirrors the similar articulatory characteristics of these letters. This reversible treatment ensures that when a word is transformed, a **w** in the original may become a **y** in the cipher (and vice versa), preserving both the sound and the intended natural reading by an English speaker.

- **w** functions both as a consonant and sometimes as a vowel.
- When **w** is pronounced like “oo,” it remains as **w** in writing but is vocalized accordingly.
- **Example:** _any_ → _amw_ (pronounced “amoo”).

### 1.4.4. Final-Word "E" Rule

- If an **e** comes immediately after a consonant at the end of a word and solely modifies the preceding vowel’s sound, it is retained.
- **Examples:**
  - _hose, hate, shove, pare_ keep the final **e**.
  - (For words like _shoe, bee, hoe_, where **e** is intrinsic to the vowel sound, treatment may vary.)

### 1.4.5. Past Tense "ed" Mapping

- When translating past tense endings, the suffix **"ed"** (when pronounced as /d/ or /t/) is mapped to **"ob"** rather than to **"it."**
- **Example:** A word ending in the past tense marker **"ed"** should have that ending transformed to **"ob"**.

### 1.4.6. Adjustments for Initial Consonant Clusters

- **Br/Pr Adjustments:**
  - If an English word begins with **br** or **pr** and the transformation would yield an initial cluster like **dl** or **tl**, the **r** is retained.
  - **Example:** _brat_ becomes _drap_ (not _dlap_).
- **Gr- Words:**
  - Similarly, if a word begins with **gr**, the transformation will preserve the **r** (resulting in an output where **gr** → **jr**, not just **j**).
  - This is analogous to the handling of words starting with **br** or **pr**.

### 1.4.7. Nasal and Affricate Combinations

- For combinations such as **ng, nk, nj,** or **nch**, if the rules would otherwise produce clusters like **mj, mch, mg,** or **mk**, the original nasal (**n**) is preserved.

### 1.4.8. Phonotactic Smoothing with Schwa (ə)

- If the transformed word contains awkward or hard-to-pronounce clusters, insert a schwa (ə) to ease pronunciation.
- **Examples:**
  - _brat_ might transform to _dlap_, pronounced “dəlap.”
  - _bank_ might become _damch_, pronounced “daməch.”

### 1.4.9. Digraph and Phonetic Combination Rule

- Because this is a phonetic cipher, transformation is based on sound rather than strict letter sequences:
  - **"ti" in _station_:**
    - In _station_, the “ti” produces a /ʃ/ sound. In the cipher, it is rendered as **zh**.
  - **"si" in _asia_:**
    - When “si” in a word like _asia_ is pronounced with a hard “sh” sound, it is rendered as a hard **sh**.

### 1.4.10. Reversibility of Mappings

- **Important:** All mappings are reversible. For example:
  - **m ↔ n**
  - **y ↔ w**
  - **i ↔ u** (with **i → u** and **u → i**)
  - **o ↔ e** (with **o → e** and **e → o**)
- This ensures that the cipher can be used both to encode and decode words consistently.

### 1.4.11. Orthographic Emphasis on Intended Pronunciation

- When appropriate, the spelling of the translated word may include extra letters to emphasize the intended pronunciation.
  - **Examples:**
    - **truck** might be rendered as **plitch** (to evoke the familiar sound, as in **hitch**).
    - **with** might translate to **yuff**.
    - **hitch** might translate to **huck**.
- These modifications are applied only when they enhance clarity for standard English readers.

---

## 1.5. Additional Considerations

### 1.5.1. Silent Letters

- **Silent letters are ignored.**
  - For instance, the **k** in _know_ and the **h** in _what_ are not considered in the transformation.

### 1.5.2. Final "-le" Mapping

- If a word ends in **-le** (pronounced /əl/, as in _little_), it maps to **ir**.
  - **Example:** _little_ → _ruppir_

---

## 1.6. Transformation Process Overview

When converting an English word using the cipher:

1. **Analyze the Word’s Sounds:**

   - Break the word into its individual sounds or letters. For ambiguous cases (e.g., **c**, **ti**, **si**), determine the appropriate sound based on context.
   - Ignore any silent letters.

2. **Apply the Mappings:**

   - Substitute each vowel and consonant with its mapped counterpart as outlined above.
   - For example, a “ti” that sounds like /ʃ/ becomes **zh**.

3. **Apply Special Rules and Adjustments:**

   - Check for awkward clusters (e.g., “dl” or problematic nasal clusters) and apply adjustments (such as retaining the **r** in clusters from **br**, **pr**, or **gr** words, or inserting a schwa).
   - Preserve the final **e** when it solely modifies the preceding vowel.
   - For past tense endings, map **"ed"** to **"ob."**
   - Use orthographic emphasis when needed (e.g., adding extra letters to clarify pronunciation).

4. **Reading the Output:**
   - The final written output is read using standard English pronunciation rules. Although the written form is generated systematically, the spoken form will naturally conform to English reading habits.

---

## 1.7. Example Transformation: "english" → "omjruzh"

Let's walk through how the word **"english"** is transformed:

1. **Segmentation of "english":**

   - **e**
   - **n**
   - **g**
   - **l**
   - **i**
   - **sh**
     - (Here, **sh** represents the soft “sh” sound.)

2. **Apply the Mappings:**

   | Original | Mapping                                      | Resulting Letter(s) |
   | -------- | -------------------------------------------- | ------------------- |
   | **e**    | Based on reversible vowel pairing: **e → o** | **o**               |
   | **n**    | **n → m**                                    | **m**               |
   | **g**    | A soft **g** is represented as **j**         | **j**               |
   | **l**    | **l → r**                                    | **r**               |
   | **i**    | **i → u**                                    | **u**               |
   | **sh**   | Soft **sh** maps to **zh**                   | **zh**              |

   Thus, **"english"** becomes: onjjruzh

3. **Final Pronunciation Note:**

- The written output **"onjruzh"** is then read aloud using standard English pronunciation rules.
- (For instance, clusters such as **chr** would be read as “chər” to preserve the intended /tʃ/ sound.)

---

## 1.8. Summary

This reversible phonetic cipher systematically transforms English words by swapping vowels and consonants according to defined rules:

- **Vowel Mapping:**
- **i ↔ u**, **o ↔ e**, with **a** remaining unchanged.
- **Consonant Mapping:**
- **m ↔ n**
- **d, t, soft th (`dh`), hard th → b, p, dh, f**
- **Affricates:** **j → g** and **ch** remains **ch** (ensuring a /tʃ/ pronunciation)
- **y ↔ w**
- **l ↔ r**
- **h** and **x** remain unchanged.
- **Special Considerations:**
- Standardizes soft/hard variants (e.g., soft **g** always as **j**, soft **s** always as **z**, soft **sh** always as **zh**, and soft th represented as `dh`).
- Treats **c** based on its pronunciation.
- Handles **w** and its vowel-like behavior.
- Retains a final **e** when it solely modifies the preceding vowel.
- Maps past tense **"ed"** to **"ob"**.
- Adjusts initial consonant clusters (preserving **r** in words starting with **br**, **pr**, or **gr**).
- Preserves original nasals in clusters.
- Uses phonotactic smoothing with schwa (ə) when needed.
- Applies a digraph rule (e.g., **ti** in _station_ becomes **zh**; **si** in _asia_ becomes a hard **sh**).
- Permits orthographic emphasis (e.g., **truck** → **plitch**, **with** → **yuff**).
- Maps final **-le** (pronounced /əl/) to **ir** (e.g., _little_ → _ruppir_).
- **Additional Considerations:**
- Silent letters are ignored.
- **Reversibility:**
- Every mapping is reversible.
- **Pronunciation:**
- The final written output is read using standard English pronunciation rules.
