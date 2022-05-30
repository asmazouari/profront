import { Produit } from "../../Models/produit";

export abstract class SmartTableData {
  abstract getData(): Produit[];
}
