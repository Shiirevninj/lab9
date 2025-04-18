import { FlashCard } from './flashcard'

interface CardStatus {
  lastMistakeTimestamp: number
  /**
   * Retrieves the {@link FlashCard} associated with this {@code CardStatus}.
   *
   * @return The associated {@link FlashCard}.
   */
  getCard: () => FlashCard

  /**
   * Retrieves the record of past successes at answering this card.
   *
   * @return A list of boolean's indicating the recorded outcome of previous attempts to answer this card.
   */
  getResults: () => boolean[]

  /**
   * Updates the internal success tracker with a new answering outcome.
   *
   * @param success {@code true} if this card was answered correctly.
   */
  recordResult: (success: boolean) => void

  /**
   * Resets the record of past answering outcomes.
   */
  clearResults: () => void
}

/**
 * Creates a new {@link CardStatus} instance.
 *
 * @param card The {@link FlashCard} card to track answer correctness for.
 */
function newCardStatus (card: FlashCard): CardStatus {
  let successes: boolean[] = []
  let lastMistakeTimestamp = 0 

  return {
    lastMistakeTimestamp,
    getCard: function (): FlashCard { return card },
    getResults: function (): boolean[] { return successes.slice() },
    recordResult: function (success: boolean): void {
      successes.push(success)
      if (!success) {
        
        lastMistakeTimestamp = Date.now() 
      }
    },
    clearResults: function (): void {
      successes = []
      lastMistakeTimestamp = 0 
    }
  }
}

export { CardStatus, newCardStatus }